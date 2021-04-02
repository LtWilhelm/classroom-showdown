<script>
  export let to;
</script>

<li><a href={"#" + to}><slot /></a></li>

<style>
  li {
    width: 100%;
    border-radius: 10px;
    margin: 15px 0;
    /* border: 3px solid var(--bg); */
    /* border-image: linear-gradient(45deg, ); */
    /* box-shadow: 20px 20px 60px var(--shade) -20px -20px 60px var(--light); */
    /* box-shadow: -5px -5px 10px var(--light), 5px 5px 10px var(--shade); */
    background: linear-gradient(145deg, var(--highlight), var(--lowlight));

    backdrop-filter: blur(10px);
  }
  
  a {
    text-decoration: none;
    display: inline-block;
    padding: 5px;
    width: 100%;
    height: 100%;
  }
  
</style>
