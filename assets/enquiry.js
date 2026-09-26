/* Enquiry form — progressive enhancement.
   Without JS the form still POSTs normally to /api/enquiry and the Function
   returns a plain thank-you page. With JS it checks the fields, submits in
   place and keeps the visitor on the page. */
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

  function fieldName(field) {
    var label = form.querySelector('label[for="' + field.id + '"]');
    // The label's first text node, without the "(optional)" tag.
    return label ? label.firstChild.textContent.trim() : field.name;
  }

  // The form is `novalidate`, so the browser shows nothing for a missing
  // field. Without this, an incomplete form fell through to the no-JS POST
  // and the visitor landed on a bare error page with their typing gone.
  function flagInvalidFields() {
    var invalid = [];
    Array.prototype.forEach.call(form.querySelectorAll('input, select, textarea'), function (field) {
      if (!field.id || field.closest('.hp')) return;
      if (field.checkValidity()) {
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
      } else {
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', 'efStatus');
        invalid.push(field);
      }
    });
    if (!invalid.length) return true;
    setStatus('Please check: ' + invalid.map(fieldName).join(', ') + '.', 'err');
    invalid[0].focus();
    return false;
  }

  // Clear a field's error as soon as it is fixed, not on the next submit.
  form.addEventListener('input', function (e) {
    if (e.target.getAttribute('aria-invalid') && e.target.checkValidity()) {
      e.target.removeAttribute('aria-invalid');
      e.target.removeAttribute('aria-describedby');
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!flagInvalidFields()) return;

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
