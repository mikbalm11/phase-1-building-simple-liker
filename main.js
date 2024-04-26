// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

document.addEventListener('DOMContentLoaded', () => {
  const errorModal = document.getElementById('modal');

  const handleLike = async (event) => {
    const heartGlyph = event.target;
    if (heartGlyph.classList.contains('like-glyph')) {
      if (heartGlyph.classList.contains('activated-heart')) {
          try {
              await mimicServerCall();
              heartGlyph.classList.remove('activated-heart');
              heartGlyph.textContent = EMPTY_HEART;
              errorModal.classList.add('hidden');
          } catch (error) {
              const modalMessage = document.getElementById('modal-message');
              modalMessage.textContent = error;
              errorModal.classList.remove('hidden');
              setTimeout(() => errorModal.classList.add('hidden'), 3000);
          }
      } else {
          try {
              await mimicServerCall();
              heartGlyph.classList.add('activated-heart');
              heartGlyph.textContent = FULL_HEART;
              errorModal.classList.add('hidden');
          } catch (error) {
              const modalMessage = document.getElementById('modal-message');
              modalMessage.textContent = error;
              errorModal.classList.remove('hidden');
              setTimeout(() => errorModal.classList.add('hidden'), 3000);
          }
      }
    }
  };

  document.body.addEventListener('click', handleLike);
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
