<?php include('inc/header.php'); ?>

<div class="main-container">
	<div class="row">
		
		<div class="left-sidebar columns large-3">
			<div class="forums-nav">
				<ul class="side-nav">
					<li>
						<a href="">Recent Activity <i class="fa fa-circle"></i></a>
					</li>
				</ul>
			</div>
		</div>

		<main class="main-content columns large-6">

			<section class="threads">
				<header class="section__header">
					<h2>Recent Activity</h2>
				</header>

				<article class="thread" data-author-id="1">
					<div class="row">
						<div class="columns large-2">
							<img src="http://placehold.it/50x50" alt="" class="avatar">
						</div>
						<div class="columns large-10">
							<header class="user-details">
								<h3 class="username"><a href="">RiRiKa</a></h3>
								<span class="usertitle">Junior</span>
							</header>
							<div class="body">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias libero, dignissimos aut vitae doloremque consequatur, quam nulla fugiat nisi nesciunt, omnis. Dolorem et distinctio laborum voluptatum dolor omnis harum qui.
							</div>
							<ul class="replies">
								<li class="replies__post" data-post-id="100">
									<h4>admin</h4>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt repudiandae mollitia harum laudantium commodi expedita illum eos, quam quia accusantium aspernatur unde, pariatur ipsam quos odio omnis molestias natus voluptatem.</p>
								</li>
							</ul>
						</div>
					</div>
				</article>

				<footer class="section__footer">
					<ul class="pagination">
						<li>1</li>
					</ul>
				</footer>
			</section>

		</main>
		<div class="right-sidebar columns large-3">
			<div class="widget">
				<header>
					<h2>Members Online</h2>
					<span class="num-members">25</span>
				</header>
				<div class="body">
					<ul class="members-list">
						<li><a href=""><img src="" alt="" class="avatar" data-username="admin"></a></li>
					</ul>
				</div>
			</div>
		</div>

	</div>
</div>

<?php include('inc/footer.php'); ?>