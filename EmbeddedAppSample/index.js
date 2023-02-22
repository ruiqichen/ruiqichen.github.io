// Check URL Hash for Login with Webex Token
parseJwtFromURLHash();

const app = new window.Webex.Application();

app.onReady().then(() => {
  log("onReady()", { message: "host app is ready" });

  // Listen and emit any events from the EmbeddedAppSDK
  app.listen().then(() => {
    app.on("application:displayContextChanged", (payload) =>
      log("application:displayContextChanged", payload)
    );
    app.on("application:shareStateChanged", (payload) =>
      log("application:shareStateChanged", payload)
    );
    app.on("application:themeChanged", (payload) =>
      log("application:themeChanged", payload)
    );
    app.on("meeting:infoChanged", (payload) =>
      log("meeting:infoChanged", payload)
    );
    app.on("meeting:roleChanged", (payload) =>
      log("meeting:roleChanged", payload)
    );
    app.on("space:infoChanged", (payload) => log("space:infoChanged", payload));
  });
});

/**
 * Sets the share url to the value entereed in the "shareUrl" element.
 * @returns
 */
function handleSetShare() {
  if (app.isShared) {
    log("ERROR: setShareUrl() should not be called while session is active");
    return;
  }
  var url = document.getElementById("shareUrl").value;
  app
    .setShareUrl(url, url, "Embedded App Kitchen Sink")
    .then(() => {
      log("setShareUrl()", {
        message: "shared url to participants panel",
        url: url,
      });
    })
    .catch((error) => {
      log(
        "setShareUrl() failed with error",
        Webex.Application.ErrorCodes[error]
      );
    });
}

/**
 * Clears the share url
 */
function handleClearShare() {
  app
    .clearShareUrl()
    .then(() => {
      log("clearShareUrl()", { message: "share url has been cleared" });
    })
    .catch((error) => {
      log(
        "clearShareUrl() failed with error",
        Webex.Application.ErrorCodes[error]
      );
    });
}

function handleSetPresentationUrl() {
  var url = document.getElementById("presentationUrl").value;
  app.context
    .getMeeting()
    .then(function (meeting) {
      console.log("Promise getMeeting success", JSON.stringify(meeting));
      print("Promise getMeeting success", JSON.stringify(meeting));
      printState("Meeting States", meeting);

      var url = document.getElementById("presentationUrl").value || "";
      var title = document.getElementById("presentationTitle").value || "";
      var select = document.getElementById("shareMode");
      var shareOptimizationMode = parseInt(select.options[select.selectedIndex].value);

      select = document.getElementById("includeAudio");
      var includeAudio = select.options[select.selectedIndex].value === "true";

      meeting
        .setPresentationUrl(url, title, shareOptimizationMode, includeAudio)
        .then(function (res) {
          console.log("Promise setPresentationUrl success", JSON.stringify(res));
          print("Promise setPresentationUrl success", JSON.stringify(res));
        })
        .catch(function (reason) {
          console.error("setPresentationUrl: fail reason=" + reason);
          print("setPresentationUrl: fail reason=" + reason);
        });

    })
    .catch(function (reason) {
      console.error("getMeeting: fail reason=" + reason);
      print("getMeeting: fail reason=" + reason, "ERROR");
    });
}

/**
 * Clears the share url
 */
function handleClearPresentationUrl() {
  app.context
    .getMeeting()
    .then(function (meeting) {
      console.log("Promise getMeeting success", JSON.stringify(meeting));
      print("Promise getMeeting success", JSON.stringify(meeting));
      printState("Meeting States", meeting);

      meeting
        .clearPresentationUrl()
        .then(function (res) {
          console.log("Promise setPresentationUrl success", JSON.stringify(res));
          print("Promise setPresentationUrl success", JSON.stringify(res));
        })
        .catch(function (reason) {
          console.error("setPresentationUrl: fail reason=" + reason);
          print("setPresentationUrl: fail reason=" + reason);
        });

    })
    .catch(function (reason) {
      console.error("getMeeting: fail reason=" + reason);
      print("getMeeting: fail reason=" + reason, "ERROR");
    });
}