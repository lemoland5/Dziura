// Please update this to something more beautiful.

if (window.location.href.endsWith("?tooshort=true")) {
  alert("Password too short");
}
if (window.location.href.endsWith("?exists=true")) {
  alert("User already exists");
}
if (window.location.href.endsWith("?failed=true")) {
  alert("Login failed");
}
