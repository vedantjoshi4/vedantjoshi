// Image Upload
function uploadImage() {
    const file = document.getElementById('imageUpload').files[0];
    const storageRef = storage.ref(`images/${file.name}`);
    
    storageRef.put(file).then(() => {
      alert('Image uploaded!');
      // Refresh gallery
      loadGallery();
    });
  }
  
  // Comments System
  function postComment() {
    const comment = document.getElementById('commentInput').value;
    db.collection("comments").add({
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
  
  function loadComments() {
    db.collection("comments").orderBy("timestamp").onSnapshot(snap => {
      let html = '';
      snap.forEach(doc => {
        html += `<div class="comment">${doc.data().text}</div>`;
      });
      document.getElementById('commentsContainer').innerHTML = html;
    });
  }
  
  // Initialize after DOM load
  document.addEventListener('DOMContentLoaded', () => {
    loadComments();
    loadGallery(); // Load portfolio images from Firebase
  });