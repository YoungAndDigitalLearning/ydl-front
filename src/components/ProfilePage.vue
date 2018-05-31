<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12 col-lg-10 d-flex">
        <header>
          <h2 class="text-left">Y&amp;D Learning</h2>
          <p>Mehr als nur Sprache lernen</p>
        </header>
      </div>
      <div class="col"><img src="assets/img/desk.jpg" style="height:80px;"></div>
    </div>
    <div class="row">
      <div class="col-md-4 col-lg-3">
        <nav class="navbar navbar-light navbar-expand-md">
          <div class="container-fluid">
            <button class="navbar-toggler" data-toggle="collapse" data-target="#navcol-1">
              <span class="sr-only">Toggle navigation</span>
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navcol-1">
              <ul class="nav navbar-nav">
                <li class="nav-item" role="presentation">
                  <a class="nav-link active" href="#">First Item</a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" href="#">Second Item</a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" href="#">Third Item</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div class="col-md-4 col-lg-7">
        <ul class="list-group">
          <li class="list-group-item">
            <span style="font-size:24px;">Italienisch</span>
            <p>Es gibt neue Details</p>
          </li>
          <li class="list-group-item">
            <span style="font-size:25px;">Spanisch</span>
            <p>Es gibt neue Details</p>
          </li>
          <li class="list-group-item">
            <div>
              <span style="font-size:24px;" href="http://www.google.de">Französisch</span>
              <p>Es gibt neue Details</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-md-4 col-lg-2">
        <h6>Aktuelle Termine</h6>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
html {
  height: 100%;
}
</style>
