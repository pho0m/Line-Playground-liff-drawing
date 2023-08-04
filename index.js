// Import stylesheets
import './styles.css';

// index section
// 0. Import LIFF SDK
import liff from '@line/liff';
import Swal from 'sweetalert2';

// Body element
const body = document.getElementById('body');

// Profile elements
const pictureUrl = document.getElementById('pictureUrl');
const userId = document.getElementById('userId');
const displayName = document.getElementById('displayName');
const statusMessage = document.getElementById('statusMessage');

// Button elements
const btnShare = document.getElementById('btnShare');

async function main() {
  // 2. liff.ready
  liff.ready.then(() => {
    if (liff.getOS() === 'android') {
      body.style.backgroundColor = '#888888';
    }
    if (liff.isInClient()) {
      getUserProfile();
    }
    btnShare.style.display = 'block';
  });

  // 3. Try a LIFF function
  // 4. Check where LIFF was opened
  // 5. Call getUserProfile()
  // 10. Show share button

  // 1. Initialize LIFF app)
  await liff.init({ liffId: '2000217484-zay0pjQy' });
}
main();

var user_profile;

// 6. Create getUserProfile()
// *7. Get email
async function getUserProfile() {
  const profile = await liff.getProfile();
  user_profile = profile;
  pictureUrl.src = profile.pictureUrl;
  userId.innerHTML = '<b>userId: </b>' + profile.userId;
  displayName.innerHTML = '<b></b>' + profile.displayName;

  if (profile.statusMessage != undefined) {
    statusMessage.innerHTML = '<b>status: </b>' + profile.statusMessage;
  } else {
    statusMessage.innerHTML = '<b>status: feeling good no status 🤭</b>';
  }
}

// *8. Create shareMsg()
async function shareMsg() {
  const result = await liff.shareTargetPicker([
    {
      type: 'text',
      text: `I'm ${user_profile.displayName} This msg was shared by LIFF`,
    },
  ]);
  if (result) {
    Swal.fire({
      icon: 'success',
      title: 'Success !',
      text: 'Profile was shared!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
    }).then((result) => {
      liff.closeWindow();
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'ShareTargetPicker was cancelled by user',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
    }).then((result) => {
      liff.closeWindow();
    });
  }
}
// 11. Add close window

// 9. Add event listener to share button
btnShare.onclick = () => {
  console.log('in btnshare');
  shareMsg();
};
