var initTimestamp;

Template.media.rendered = function() {
  $('#main-video').on('canplay', function() {
    Session.set('loadingRoom', false);
  });

  $('#main-video').on('timeupdate', function() {
    var time = 0;
    if(Session.get('live')) {
      time = this.currentTime - initTimestamp;
    }
    $(".room__controls__current-time").text(formatTime(time));
  });
};

Template.media.helpers({
  live: function () {
    return Session.get('live');
  },
  recording: function () {
    return Session.get('recording');
  }
});

function formatTime(seconds) {
  minutes = Math.floor(seconds / 60);
  minutes = (minutes >= 10) ? minutes : "0" + minutes;
  seconds = Math.floor(seconds % 60);
  seconds = (seconds >= 10) ? seconds : "0" + seconds;
  return minutes + ":" + seconds;
};

Tracker.autorun(function() {
  if(Session.get('live')) {
    initTimestamp = document.getElementById('main-video').currentTime;
  }
});
