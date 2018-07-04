<template>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="340px" height="333px" viewBox="0 0 340 333" enable-background="new 0 0 340 333" xml:space="preserve">
  <style>.cls-1{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:15px;}</style>
  
<path class="cls-1 path1" d="M7.27,38.4c9.15,0,85-2.61,132.36-11.76"/>
<path class="cls-1 path2" d="M63.48.91C59.72,31.64,57,62.73,59.54,93.69s12,60,22.24,89.15"/>
<path class="cls-1" d="M125,56.7c-4.67,13.73-13.83,60.13-41.28,93.47-9.89,12-22.69,25.07-37.36,31-9.18,3.72-20.45,3.9-28.34-2.11-6.34-4.84-9.54-12.91-10.31-20.85C4.65,126.57,33.21,102.81,59.6,91.88c20.22-8.38,47.68-13.61,82-3.15,22.07,6.72,41.15,22.87,41.39,47.58.35,35.54-38,52.88-67.55,59.61"/>
</svg>
</template>

<style lang="scss" scoped>
.path1 {
  stroke-dasharray: 200;
  stroke-dashoffset: 20;
  animation: dash1 1.5s linear;
}

@keyframes dash1 {
  from {
    stroke-dashoffset: 200;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.path2 {
  stroke-dasharray: 200;
  stroke-dashoffset: 20;
  animation: dash2 1.5s linear;
  animation-delay: 2s;
}

@keyframes dash2 {
  from {
    stroke-dashoffset: 200;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>
