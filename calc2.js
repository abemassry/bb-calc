(function() {
  var head = document.getElementsByTagName('head')[0];
  var jq2 = document.createElement('script');
  jq2.type='text/javascript';
  jq2.src='https://code.jquery.com/jquery-latest.js';
  head.appendChild(jq2);
  var ss2 = document.createElement('link');
  ss2.type='text/css';
  ss2.rel='stylesheet';
  ss2.href='https://cdn.rawgit.com/noelboss/featherlight/1.7.13/release/featherlight.min.css';
  head.appendChild(ss2);
  setTimeout(function() {
    var lb2 = document.createElement('script');
    lb2.type='text/javascript';
    lb2.src='https://cdn.rawgit.com/noelboss/featherlight/1.7.13/release/featherlight.min.js';
    head.appendChild(lb2);
    setTimeout(function() {
      $(document).ready(function() {
        
        $.featherlight($('<div id="running-calc">Running calc</div>'));
        console.log('started');
        $(".participant-column-image + div a").each(function(i) {
          $.get($(this).attr('href')+'/activity_feed', function(data) {
            var shakeology = $(data).find('.panel.panel-default .panel-body .activity-type-shakeology');
            $(shakeology).each(function(index) {
              console.log($(this).find('.activity-type-title').text() + ' , ' + $(this).find('.activity-created-at').text());
              $('#running-calc').append('<h4>'+$(this).find('.activity-type-title').text()+'</h4>');
            });
          });
        });
        
        console.log($('.language-javascript.hljs'));
        
      });
    }, 1000);
  }, 1000);
})()
