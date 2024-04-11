document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector(".footer-custom")
  footer.innerHTML = ` <div class="container-fluid bg-dark text-white vh-100r">
  <div class="row p-3 gap-4">
    <div
      class="col-sm d-flex justify-content-center align-content-center flex-column"
    >
      <h5>Auction on Bidme</h5>
      <span>Upcoming auctions</span>
      <span>Finished auctions</span>
      <span>Partners</span>
      <span>Artists</span>
    </div>
    <div
      class="col-sm d-flex justify-content-center align-content-center flex-column"
    >
      <h5>Let us help you</h5>
      <span>Contact</span>
      <span>Terms and conditions</span>
      <span>Cookies</span>
      <span>Privacy Policy</span>
    </div>
    <div class="col-sm d-flex align-content-center flex-column">
      <h5 class="mb-3">Follow us</h5>
      <div class="d-flex justify-content-start align-content-center gap-4">
        <i
          class="fa-brands fa-facebook text-dark p-2 bg-white rounded-circle"
        ></i>
        <i
          class="fa-brands fa-square-instagram text-dark p-2 bg-white rounded-circle"
        ></i>
        <i
          class="fa-brands fa-linkedin-in text-dark p-2 bg-white rounded-circle"
        ></i>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-start align-items-center">
    <div
      class="row bg-dark d-flex align-content-center justify-content-center p-3"
    >
      <div
        class="col d-flex align-content-center justify-content-center flex-column gap-2"
      >
        <h5>Be up to date</h5>
        <span
          >Subscribe to the free newsletter, you'll find out about current
          auctions and interesting lots.</span
        >
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Email address"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <div class="input-group-append">
            <button class="btn btn-primary text-white" type="button">
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="container-fluid custom-height-pre-navbar bg-light p-1">
  <div class="d-flex justify-content-center align-items-center">
    <h6>&copy; 2024 Weronika Martinsen. All rights reserved.</h6>
  </div>
</div>
  
  `
})
