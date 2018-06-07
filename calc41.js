(function() {
  var shakes = {};
  var workouts = {};
  var peopleArray = [];
  function uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = a[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
  }
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
        var svg = '<svg class="lds-spinner" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g transform="rotate(0 50 50)"><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#0171e2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(30 50 50)"><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#0171e2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(60 50 50)"><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#0171e2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(90 50 50)"><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#0171e2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(120 50 50)"><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#0171e2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(150 50 50)"><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#0171e2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(180 50 50)"><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#0171e2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(210 50 50)"><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#0171e2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(240 50 50)"><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#0171e2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(270 50 50)"><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#0171e2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(300 50 50)"><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#0171e2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(330 50 50)"><rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill="#0171e2"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate></rect></g></svg>';
        $.featherlight($('<div id="running-calc">Running calc<br /><div id="loading-spinner">'+svg+'</div><br /></div>'));
        console.log('started');
        var requestCounter = 0;
        $(".participant-column-image + div a").each(function(i) {
          var person = $(this).text();
          peopleArray.push(person);
          shakes[person] = [];
          workouts[person] = [];
          $.get($(this).attr('href')+'/activity_feed', function(data) {
            requestCounter++;
            var shakeology = $(data).find('.panel.panel-default .panel-body .activity-type-shakeology');
            var workoutpage = $(data).find('.panel.panel-default .panel-body .activity-type-workout');
            $(shakeology).each(function(index) {
              console.log($(this).find('.activity-type-title').text() + ' , ' + $(this).find('.activity-created-at').text());
              var shake = $(this).find('.activity-type-title').text();
              var timestamp = $(this).find('.activity-created-at').text();
              var DateTime = luxon.DateTime;
              var two = DateTime.local().minus({ days: 2 }).toFormat('LLL d');
              var three = DateTime.local().minus({ days: 3 }).toFormat('LLL d');
              var four = DateTime.local().minus({ days: 4 }).toFormat('LLL d');
              var five = DateTime.local().minus({ days: 5 }).toFormat('LLL d');
              var six = DateTime.local().minus({ days: 6 }).toFormat('LLL d');
              var seven = DateTime.local().minus({ days: 7 }).toFormat('LLL d');
              var dayStamp = timestamp.split(' at ')[0].split('Created:')[1].trim();
              if ( ! (timestamp.match(/Yesterday/) || timestamp.match(two) || timestamp.match(three) || timestamp.match(four) || timestamp.match(five) || timestamp.match(six) || timestamp.match(seven))) {
                // dont display
              } else {
                shakes[person].push(dayStamp);
                shakes[person] = uniq_fast(shakes[person]);
              }
            });
            $(workoutpage).each(function(index) {
              console.log($(this).find('.activity-type-title').text() + ' , ' + $(this).find('.activity-created-at').text());
              var workout = $(this).find('.activity-type-title').text();
              var timestamp = $(this).find('.activity-created-at').text();
              var DateTime = luxon.DateTime;
              var two = DateTime.local().minus({ days: 2 }).toFormat('LLL d');
              var three = DateTime.local().minus({ days: 3 }).toFormat('LLL d');
              var four = DateTime.local().minus({ days: 4 }).toFormat('LLL d');
              var five = DateTime.local().minus({ days: 5 }).toFormat('LLL d');
              var six = DateTime.local().minus({ days: 6 }).toFormat('LLL d');
              var seven = DateTime.local().minus({ days: 7 }).toFormat('LLL d');
              var dayStamp = timestamp.split(' at ')[0].split('Created:')[1].trim();
              if ( ! (timestamp.match(/Yesterday/) || timestamp.match(two) || timestamp.match(three) || timestamp.match(four) || timestamp.match(five) || timestamp.match(six) || timestamp.match(seven))) {
                // dont display
              } else {
                workouts[person].push(dayStamp);
              }
            });
          });
        });
        setTimeout(function() {
          console.log('ran the wait');
          console.log(peopleArray);
          console.log(shakes);
          console.log(workouts);
          var shakeArray = [];
          var workoutArray = [];
          var pointsArray = [];
          for (var i = 0; i<peopleArray.length; i++) {
            shakeArray.push(shakes[peopleArray[i]].length);
            var shakepoints = shakes[peopleArray[i]].length * 5;
            workoutArray.push(workouts[peopleArray[i]].length);
            var workoutpoints = workouts[peopleArray[i]].length * 3;
            pointsArray.push(shakepoints + workoutpoints);
          }
          console.log('workoutArray', workoutArray);
          console.log('shakeArray', shakeArray);
          console.log('pointsArray', pointsArray);
          var zip = [];
          for (var i = 0; i < peopleArray.length; i++) {
              zip.push([pointsArray[i], peopleArray[i]]);
          }

          zip.sort(function (a, b) { return b[0] - a[0]; });

          for (var i = 0; i < zip.length; i++) {
              pointsArray[i] = zip[i][0];
              peopleArray[i] = zip[i][1];
          }
          for (var i = 0; i<peopleArray.length; i++) {
            $('#running-calc').append('<h4>' + peopleArray[i] +'(points):'+pointsArray[i]+', (shakes): '+shakes[peopleArray[i]].length +', (workouts): '+workouts[peopleArray[i]].length+'</h4>');
            console.log(peopleArray[i]+' (shakes): '+shakes[peopleArray[i]].length);
          }
          $('#loading-spinner').hide();
        }, 10000);
        console.log($('.language-javascript.hljs'));
        
      });
    }, 1000);
  }, 1000);
})()
