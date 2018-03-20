<template>
  <footer>
    <div class="uui-footer">
      <div class="footer-logo-copyright">
        <div class="epam-logo">
          <img src="/images/Logo_Epam_Color.svg" alt="" />
        </div>
        <p class="copyright">© 2016 EPAM Systems. All Rights Reserved.</p>
      </div>
      <div class="footer-build">
        <p class="build">Build version v <span>2.0.0.1</span></p>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'app-footer',
  };
</script>

<style lang="less" scoped>
  footer {
    .uui-footer {
      border-top: 1px solid #cccccc;
      background: #f8f8f8;
    }
  }
</style>
