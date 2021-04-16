(function(window) {
  window["env"] = window["env"] || {};

  // Environment variables
  window["env"]["ws_url"] = "${WS_URL}";
  window["env"]["socket_url"] = "${SOCKET_URL}";
})(this);
