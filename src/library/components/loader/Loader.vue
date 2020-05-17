<template>
  <div class="tw-loader">
    <svg xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="111px"
      height="111px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid">
      <g transform="translate(50 50)">
        <g transform="scale(0.7)">
          <g transform="translate(-50 -50)">
            <g transform="rotate(230.109 50 50)">
              <animateTransform attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
                dur="0.41666666666666663s"></animateTransform>
              <path fill-opacity="0.8"
                fill="#e15b64"
                d="M50 50L50 0A50 50 0 0 1 100 50Z"></path>
            </g>
            <g transform="rotate(82.576 50 50)">
              <animateTransform attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
                dur="0.5555555555555555s"></animateTransform>
              <path fill-opacity="0.8"
                fill="#f47e60"
                d="M50 50L50 0A50 50 0 0 1 100 50Z"
                transform="rotate(90 50 50)"></path>
            </g>
            <g transform="rotate(295.047 50 50)">
              <animateTransform attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
                dur="0.8333333333333333s"></animateTransform>
              <path fill-opacity="0.8"
                fill="#f8b26a"
                d="M50 50L50 0A50 50 0 0 1 100 50Z"
                transform="rotate(180 50 50)"></path>
            </g>
            <g transform="rotate(147.523 50 50)">
              <animateTransform attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
                dur="1.6666666666666665s"></animateTransform>
              <path fill-opacity="0.8"
                fill="#abbd81"
                d="M50 50L50 0A50 50 0 0 1 100 50Z"
                transform="rotate(270 50 50)"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'TwLoader',
};
</script>

<style lang="scss"scoped>
.tw-loader svg {
  margin: auto;
  background: none;
  display: block;
  shape-rendering: auto;
}
</style>
