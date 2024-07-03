document.addEventListener("DOMContentLoaded", function() {
    // Function to create a copy button
    function createCopyButton(pre) {
        var button = document.createElement("button");
        button.classList.add("copy-button")
        button.innerHTML = '📋 Copy Code';
        button.addEventListener("click", function() {
            var code = pre.querySelector("code").innerText;
            navigator.clipboard.writeText(code).then(function() {
                button.innerText = "🥳 Copied!!";
                button.classList.add("copied");
                setTimeout(()=>{
                    button.classList.remove("copied");
                    button.innerHTML = '📋 Copy Code';
                },3000);
            }, function(err) {
                console.error("Could not copy text: ", err);
            });
        });
        return button;
    }

    // Find all pre elements containing code elements
    var pres = document.querySelectorAll("pre");

    pres.forEach(function(pre) {
        // Insert the copy button before the pre element
        var button = createCopyButton(pre);
        pre.parentNode.insertBefore(button, pre);
    });
});


function load_disqus( disqus_shortname ) {
  // Prepare the trigger and target
  var disqus_trigger = document.getElementById('disqus-trigger'),
      disqus_target = document.getElementById('disqus_thread'),
      disqus_disclaimer = document.getElementById('disqus-disclaimer'),
      disqus_embed  = document.createElement('script'),
      disqus_hook   = (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]);

  // Load script asynchronously only when the trigger and target exist
  if( disqus_target && disqus_trigger ) {
    disqus_embed.type = 'text/javascript';
    disqus_embed.async = true;
    disqus_embed.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    disqus_hook.appendChild(disqus_embed);
    disqus_disclaimer.remove();
    console.log('Disqus loaded.');
  }
}
