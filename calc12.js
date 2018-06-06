(function() {
  var shakes = {};
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
  var lux = document.createElement('script');
  lux.type='text/javascript';
  lux.src='https://rawgit.com/moment/luxon/gh-pages/global/luxon.min.js';
  head.appendChild(lux);
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
          var person = $(this).text();
          shakes[person] = [];
          $.get($(this).attr('href')+'/activity_feed', function(data) {
            var shakeology = $(data).find('.panel.panel-default .panel-body .activity-type-shakeology');
            
            $(shakeology).each(function(index) {
              console.log($(this).find('.activity-type-title').text() + ' , ' + $(this).find('.activity-created-at').text());
              var shake = $(this).find('.activity-type-title').text();
              var timestamp = $(this).find('.activity-created-at').text();
              var DateTime = luxon.DateTime;
              var two = DateTime.local().minus({ days: 2 }).toFormat('LLL dd');
              var three = DateTime.local().minus({ days: 3 }).toFormat('LLL dd');
              var four = DateTime.local().minus({ days: 4 }).toFormat('LLL dd');
              var five = DateTime.local().minus({ days: 5 }).toFormat('LLL dd');
              var six = DateTime.local().minus({ days: 6 }).toFormat('LLL dd');
              var seven = DateTime.local().minus({ days: 7 }).toFormat('LLL dd');
              var dayStamp = timestamp.split(' at ')[0].split('Created:')[1];
              if ( ! (timestamp.match(/Today/) || timestamp.match(/Yesterday/) || timestamp.match(two) || timestamp.match(three) || timestamp.match(four) || timestamp.match(five) || timestamp.match(six) || timestamp.match(seven))) {
                // dont display
              } else {
                var isDouble = false;
                for (var i=0; i++; i<shakes[person].length) {
                  if (shakes[person][i] === dayStamp) {
                    console.log('2 in 1 day');
                    isDouble = true;
                  }
                }
                if (isDouble === false) {
                  $('#running-calc').append('<h4>' + person + ': '+ shake +' at '+ timestamp + ' </h4>');
                  shakes[person].push(dayStamp);
                  console.log(shakes);
                }
              }
            });
          });
        });
        
        console.log($('.language-javascript.hljs'));
        
      });
    }, 1000);
  }, 1000);
})()
