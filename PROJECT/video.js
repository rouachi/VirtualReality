var copierVideo = false;

function configurerVideo(url) {
  const video = document.createElement('video');

  var playing = false;
  var timeupdate = false;

  video.autoplay = true;
  video.muted = true;
  video.loop = true;

  // Le fait d'attendre ces 2 évènements assure
  // qu'il y a des données dans la vidéo

  video.addEventListener('playing', function() {
     playing = true;
     verifierPret();
  }, true);

  video.addEventListener('timeupdate', function() {
     timeupdate = true;
     verifierPret();
  }, true);

  video.src = url;
  video.play();

  function verifierPret() {
    if (playing && timeupdate) {
      copierVideo = true;
    }
  }

  return video;
}
