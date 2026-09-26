/* Enquiry form — progressive enhancement.
   Without JS the form still POSTs normally to /api/enquiry and the Function
   returns a plain thank-you page. With JS it submits in place and keeps the
   visitor on the page. */
(function () {
  'use strict';
  var form = document.getElementById('enquiryForm');
  if (!form) return;

  var status = document.getElementById('efStatus');
  var submit = document.getElementById('efSubmit');

  // A Turnstile token works once, so a failed send needs a fresh one.
  function resetBotCheck() {
    if (window.turnstile) window.turnstile.reset();
  }

  function setStatus(msg, kind) {
    if (!status) return;
    status.textContent = msg;
    status.className = 'form-status' + (kind ? ' ' + kind : '');
  }

  form.addEventListener('submit', function (e) {
    if (!form.checkValidity()) {
      // Let the browser show its own messages.
      return;
    }
    e.preventDefault();

    submit.disabled = true;
    setStatus('Sending…');

    var payload = {};
    new FormData(form).forEach(function (value, key) { payload[key] = value; });

    fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          return { ok: res.ok, data: data };
        });
      })
      .then(function (result) {
        if (result.ok) {
          form.reset();
          setStatus("Thanks — that's with me. I'll reply within one working day.", 'ok');
          submit.textContent = 'Enquiry sent';
        } else {
          submit.disabled = false;
          resetBotCheck();
          setStatus(
            (result.data && result.data.error) ||
            'That didn’t send. Please email joshua@smoald.com instead.',
            'err'
          );
        }
      })
      .catch(function () {
        submit.disabled = false;
        resetBotCheck();
        setStatus('That didn’t send — you may be offline. Please email joshua@smoald.com instead.', 'err');
      });
  });
})();
