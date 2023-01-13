fetch("/main_backend/etc/accessDeny.php")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    // console.log(typeof data.acs_code);
    if (data.acs_code === 0) {
      location.href = "/main_project/index.html";
    }
  })
  .catch((err) => {
    console.log(err);
  });
