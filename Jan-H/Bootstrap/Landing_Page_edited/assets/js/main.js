Vue.component('loginscreen', {
	template:'<div id="login_modal" class="modal fade show" tabindex="-1" role="dialog" style="margin:auto;"><div class="modal-dialog" role="document"><div class="modal-content"><div class="login-dark" style="height:525px;"> <button class="close" type="button" data-dismiss="modal" aria-label="Close" style="color:rgb(255,255,255);margin:0 5 0 0;"><span class="close_modal" aria-hidden="true">×</span></button><form method="post"><h2 class="sr-only">Login Form</h2><div class="illustration"><i class="icon ion-ios-locked-outline"></i></div><div class="form-group"><input class="form-control" type="email" name="email" placeholder="Email"></div><div class="form-group"><input class="form-control" type="password" name="password" placeholder="Password"></div><div class="form-group"><button class="btn btn-primary btn-block" type="submit">Log In</button></div><a href="#" class="forgot">Forgot your email or password?</a></form></div></div></div></div>'
})

Vue.component('ydl_article', {
	props: ['article_entry'],
	template:
	`<div id="landing_article" class="article-clean">
		<div class="container">
			<div class="row">
				<div class="col-lg-10 col-xl-8 offset-lg-1 offset-xl-2">
					<div class="intro">
						<h1 class="text-center"> {{ article_entry.headline }} </h1>
						<p class="text-center">
							<span class="by">by</span> 
							<a href="#">{{article_entry.author}}</a>
							<span class="date">Sept 8th, 2016 </span>
						</p>
						<img v-if="article_entry.image != ''" class="img-fluid" src="assets/img/desk.jpg">
					</div>
					<div v-html="article_entry.text" class="text"></div>
				</div>
			</div>
		</div>
	</div>`
})

new Vue ({el: '#login_screen'})

const app = new Vue ({
	el: '#landing_page_article',
	data: {
		article_entry: {}
	},
	created: function(){
		fetch('./article.json')
		 .then(response => response.json())
		 .then(json => {
		 	this.article_entry = json.article_entry
		 })
	}
})