<template>
  <div>
    <div class="container hero">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h1 class="text-center">Young&Digital Learning</h1>
          <ydl-article v-for="article in articleEntries" v-bind:article_entry='article' v-bind:key="article.id"></ydl-article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Article from "@/components/Article"

export default {
  name: "MainPage",
  data () {
    return {
      articleEntries: [
        {
          id: 123456,
          headline: "Jetzt noch mehr Japanisch! こにちは！",
          author: "me",
          text: "<p>Sed lobortis mi. Suspendisse vel placerat ligula. <span style=\"text-decoration: underline;\">Vivamus</span> ac sem lac. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.</p><p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac lacus. <strong>Ut vehicula rhoncus</strong> elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit <em>pulvinar dict</em> vel in justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.</p><h2>Aliquam In Arcu </h2><p>Suspendisse vel placerat ligula. Vivamus ac sem lac. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.</p><p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae. Suspendisse vel placerat ligula. Vivamus ac sem lac. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p>",
          image: "assets/img/DSC00174"
        },
        {
          id: 123457,
          headline: "Gemeinsam mehr als Sprachen lernen!",
          author: "you",
          text: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec eleifend nisi, semper pulvinar nisl. Quisque sit amet cursus ligula. Integer a justo at est finibus volutpat vitae id sem. Maecenas vitae urna id sem tristique dignissim sit amet id nulla. Aliquam in ipsum gravida, laoreet arcu sit amet, sollicitudin enim. Duis commodo sem ac est aliquam, at consequat nibh pretium. Morbi massa odio, sagittis at orci eget, dapibus ultricies massa.Aliquam sed convallis mauris, vel venenatis lacus. Proin rutrum, neque ut viverra congue, ex augue scelerisque ipsum, sit amet tempus arcu lacus nec turpis. Phasellus dapibus, velit sit amet lacinia faucibus, nisi tellus aliquam dolor, quis rhoncus purus neque id purus. Ut eu iaculis augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse interdum, tellus porttitor eleifend interdum, eros velit varius diam, id aliquet eros mauris sed elit. Vestibulum sed nisi ullamcorper, porta massa sed, tristique arcu. Aliquam id diam id ipsum tempor dignissim nec eu mi. Quisque sed ullamcorper massa, ut molestie nulla. Proin fringilla porta elit, nec luctus ipsum feugiat in. Nam mollis ullamcorper nulla.Vestibulum venenatis nisl id mauris feugiat hendrerit. Suspendisse mattis maximus felis, at maximus lectus scelerisque sed. Suspendisse luctus nisl velit, non finibus turpis ultrices ac. Praesent pellentesque velit ut nisl laoreet, sed porttitor nulla venenatis. Cras ut augue at erat mollis fringilla et ut massa. Nunc congue tempus placerat. Nulla porta cursus dictum. Suspendisse sed sollicitudin felis. Aenean consectetur, lacus non maximus mollis, lectus ante ultricies est, eget blandit nunc purus sit amet neque. Donec eleifend justo vitae volutpat fermentum.Vestibulum ac aliquam dolor. Vestibulum quis turpis in magna pretium efficitur. Vivamus mattis lacus non magna sodales malesuada. Aliquam gravida, nibh a molestie hendrerit, lectus nisi tincidunt orci, non volutpat lorem leo quis nulla. In a magna ut nulla egestas faucibus. Vestibulum  sodales lacus, a pretium tellus mattis eu. Sed sapien lorem, vulputate ut eleifend et, iaculis sed turpis.Phasellus aliquam metus lobortis, pretium nisi vitae, maximus felis. Morbi id sollicitudin sapien. Duis dignissim accumsan urna. Vestibulum dignissim luctus massa vel convallis. Aenean fringilla et odio sit amet volutpat.Etiam nec tellus eget tellus ultrices ultricies. Ut vel finibus dui, ut venenatis metus.</p>",
          image: "https://sass-lang.com/assets/img/styleguide/seal-color-aef0354c.png"
        },
        {
          id: 123459,
          headline: "Wir sind umgezogen!",
          author: "adminstrator",
          text: "<p>Auf einen besseren Server.</p>",
          image: "https://sass-lang.com/assets/img/styleguide/seal-color-aef0354c.png"
        }
      ]
    }
  },
  components: {
    "ydl-article": Article
  }
}
</script>

<style lang="scss" scoped>
@import "./../assets/css/Article-Clean.css";
@import "./../assets/css/Header-Dark.css";
@import "./../assets/css/Login-Form-Dark.css";
@import "./../assets/css/styles.css";

.card {
  margin-bottom: 40px;
  background-color: rgba(200, 200, 200, 0.95) !important;
}

.text-center {
  margin-top: 30px;
  margin-bottom: 70px;
}
</style>
