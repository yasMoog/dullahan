//alias the global object
//alias jQuery so we can potentially use other libraries that utilize $
//alias Backbone to save us on some typing
(function(exports, $, bb){
 
  //document ready
  $(function(){
 
    /**
     ***************************************
     * Cached Globals
     ***************************************
     */
    var $window, $body, $document;
 
    $window  = $(window);
    $document = $(document);
    $body   = $('body');

    /**
     ***************************************
     * Array Storage Driver
     * used to store our views
     ***************************************
     */
    var ArrayStorage = function(){
      this.storage = {};
    };
    ArrayStorage.prototype.get = function(key)
    {
      return this.storage[key];
    };
    ArrayStorage.prototype.set = function(key, val)
    {
      return this.storage[key] = val;
    };
     
     
     
    /**
     ***************************************
     * Base View
     ***************************************
     */
    var BaseView = bb.View.extend({
     
      /**
       * Set our storage driver
       */
      templateDriver: new ArrayStorage,
     
      /**
       * Set the base path for where our views are located
       */
      viewPath: '/views/',
     
      /**
       * Get the template, and apply the variables
       */
      template: function()
      {
        var view, data, template, self;
     
        switch(arguments.length)
        {
          case 1:
            view = this.view;
            data = arguments[0];
            break;
          case 2:
            view = arguments[0];
            data = arguments[1];
            break;
        }
     
        template = this.getTemplate(view, false);
        self = this;
     
        return template(data, function(partial)
        {
          return self.getTemplate(partial, true);
        });
      },
     
      /**
       * Facade that will help us abstract our storage engine,
       * should we ever want to swap to something like LocalStorage
       */
      getTemplate: function(view, isPartial)
      {
        return this.templateDriver.get(view) || this.fetch(view, isPartial);
      },
     
      /**
       * Facade that will help us abstract our storage engine,
       * should we ever want to swap to something like LocalStorage
       */
      setTemplate: function(name, template)
      {
        return this.templateDriver.set(name, template);
      },
     
      /**
       * Function to retrieve the template via ajax
       */
      fetch: function(view, isPartial)
      {
        var markup = $.ajax({
          async: false,
     
          //the URL of our template, we can optionally use dot notation
          url: this.viewPath + view.split('.').join('/') + '.mustache'
        }).responseText;
     
        return isPartial
          ? markup
          : this.setTemplate(view, Mustache.compile(markup));
      }
    });

    // this view will show an entire post
    // comment form, and comments
    var PostView = BaseView.extend({
     
      //the location of the template this view will use, we can use dot notation
      view: 'posts.show',
     
      //events this view should subscribe to
      events: {
        'submit form': function(e)
        {
          e.preventDefault();
          e.stopPropagation();
     
          return this.addComment( $(e.target).serialize() );
        }
      },
     
      //render our view into the defined `el`
      render: function()
      {
        var self = this;
     
        self.$el.html( this.template({
          post: this.model.attributes
        }) );
      },
     
      //add a comment for this post
      addComment: function(formData)
      {
        var
          self = this,
     
          //build our url
          action = this.model.url() + '/comments'
        ;
     
        //submit a post to our api
        $.post(action, formData, function(comment, status, xhr)
        {
          //create a new comment partial
          var view = new CommentViewPartial({
            //we are using a blank backbone model, since we done have any specific logic needed
            model: new bb.Model(comment)
          });
     
          //prepend the comment partial to the comments list
          view.render().$el.prependTo(self.$('[data-role="comments"]'));
     
          //reset the form
          self.$('input[type="text"], textarea').val('');
     
          //prepend our new comment to the collection
          self.model.attributes.comments.unshift(comment);
     
          //send a notification that we successfully added the comment
          notifications.add({
            type: 'success',
            message: 'Comment Added!'
          });
        });
     
      }
    });
  
    // this will be used for rendering a single comment in a list
    var CommentViewPartial = BaseView.extend({
      //define our template location
      view: 'comments._comment',
      render: function()
      {
        this.$el.html( this.template(this.model.attributes) );
        return this;
      }
    });
     
    //this view will be used for rendering a single post in a list
    var PostViewPartial = BaseView.extend({
      //define our template location
      view: 'posts._post',
      render: function()
      {
        this.$el.html( this.template(this.model.attributes) );
        return this;
      }
    });

    var Blog = BaseView.extend({
      //define our template location
      view: 'posts.index',
     
      //setup our app configuration
      initialize: function()
      {
        this.perPage = this.options.perPage || 15;
        this.page   = this.options.page || 0;
        this.fetching = this.collection.fetch();
     
        if(this.options.infiniteScroll) this.enableInfiniteScroll();
      },
     
      //wait til the collection has been fetched, and render the view
      render: function()
      {
        var self = this;
        this.fetching.done(function()
        {
          self.$el.html('');
          self.addPosts();
     
          var posts = this.paginate()
     
          for(var i=0; i<posts.length; i++)
          {
            posts[i] = posts[i].toJSON();
          }
     
          self.$el.html( self.template({
            posts: posts
          }) );
     
          if(self.options.infiniteScroll) self.enableInfiniteScroll();
        });
      },
     
      //helper function to limit the amount of posts we show at a time
      paginate: function()
      {
        var posts;
        posts = this.collection.rest(this.perPage * this.page);
        posts = _.first(posts, this.perPage);
        this.page++;
     
        return posts;
      },
     
      //add the next set of posts to the view
      addPosts: function()
      {
        var posts = this.paginate();
     
        for(var i=0; i<posts.length; i++)
        {
          this.addOnePost( posts[i] );
        }
      },
     
      //helper function to add a single post to the view
      addOnePost: function(model)
      {
        var view = new PostViewPartial({
          model: model
        });
        this.$el.append( view.render().el );
      },
     
      //this function will show an entire post, we could alternatively make this its own View
      //however I personally like having it available in the overall application view, as it
      //makes it easier to manage the state
      showPost: function(id)
      {
        var self = this;
     
        this.disableInifiniteScroll();
     
        this.fetching.done(function()
        {
          var model = self.collection.get(id);
     
          if(!self.postView)
          {
            self.postView = new self.options.postView({
              el: self.el
            });
          }
          self.postView.model = model;
          self.postView.render();
        });
      },
     
      //function to run during the onScroll event
      infiniteScroll: function()
      {
        if($window.scrollTop() >= $document.height() - $window.height() - 50)
        {
          this.addPosts();
        }
      },
     
      //listen for the onScoll event
      enableInfiniteScroll: function()
      {
        var self = this;
     
        $window.on('scroll', function()
        {
          self.infiniteScroll();
        });
      },
     
      //stop listening to the onScroll event
      disableInifiniteScroll: function()
      {
        $window.off('scroll');
      }
    });

    // the posts collection is configured to fetch
    // from our API, as well as use our PostModel
    var PostCollection = bb.Collection.extend({
      url: '/v1/posts'
    });

    var BlogRouter = bb.Router.extend({
      routes: {
        "": "index",
        "posts/:id": "show"
      },
      initialize: function(options)
      {
        // i do this to avoid having to hardcode an instance of a view
        // when we instantiate the router we will pass in the view instance
        this.blog = options.blog;
      },
      index: function()
      {
        //reset the paginator
        this.blog.page = 0;
     
        //render the post list
        this.blog.render();
      },
      show: function(id)
      {
        //render the full-post view
        this.blog.showPost(id);
      }
    });

    var notifications = new bb.Collection();

    var NotificationView = BaseView.extend({
      el: $('#notifications'),
      view: 'layouts._notification',
      initialize: function()
      {
        this.listenTo(notifications, 'add', this.render);
      },
      render: function(notification)
      {
        var $message = $( this.template(notification.toJSON()) );
        this.$el.append($message);
        this.delayedHide($message);
      },
      delayedHide: function($message)
      {
        var timeout = setTimeout(function()
        {
          $message.fadeOut(function()
          {
            $message.remove();
          });
        }, 5*1000);
     
        var self = this;
        $message.hover(
          function()
          {
            timeout = clearTimeout(timeout);
          },
          function()
          {
            self.delayedHide($message);
          }
        );
      }
    });
    var notificationView = new NotificationView();

    $.ajaxSetup({
      statusCode: {
        401: function()
        {
          notification.add({
            type: null, //error, success, info, null
            message: 'You do not have permission to do that'
          });
        },
        403: function()
        {
          notification.add({
            type: null, //error, success, info, null
            message: 'You do not have permission to do that'
          });
        },
        404: function()
        {
          notification.add({
            type: 'error', //error, success, info, null
            message: '404: Page Not Found'
          });
        },
        500: function()
        {
          notification.add({
            type: 'error', //error, success, info, null
            message: 'The server encountered an error'
          });
        }
      }
    });

    $document.on("click", "a[href]:not([data-bypass])", function(e){
      e.preventDefault();
      e.stopPropagation();
     
      var href = $(this).attr("href");
      bb.history.navigate(href, true);
    });
     
    $document.on("click", "[data-toggle='view']", function(e)
    {
      e.preventDefault();
      e.stopPropagation();
     
      var
        self = $(this),
        href = self.attr('data-target') || self.attr('href')
      ;
     
      bb.history.navigate(href, true);
    });

    var BlogApp = new Blog({
        el       : $('[data-role="main"]'),
        collection   : new PostCollection(),
        postView    : PostView,
        perPage    : 15,
        page      : 0,
        infiniteScroll : true
      });
       
      var router = new BlogRouter({
        blog: BlogApp
      });
       
      if (typeof window.silentRouter === 'undefined') window.silentRouter = true;
       
      bb.history.start({ pushState: true, root: '/', silent: window.silentRouter });
 
  });//end document ready
 
}(this, jQuery, Backbone));