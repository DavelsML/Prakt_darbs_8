function generatePassword() {
    var passwordLength = parseInt(document.getElementById("numberInput").value);
    var includeNumbers = document.getElementById("option1").checked;
    var includeSymbols = document.getElementById("option2").checked;
    var includeCapitals = document.getElementById("option3").checked;

    var characterSet = "abcdefghijklmnopqrstuvwxyz";

    if (includeCapitals) {
      characterSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (includeSymbols) {
      characterSet += "!@#$%^&*()_+-=[]{};':\"\\|,.<>/?";
    }

    if (includeNumbers) {
      characterSet += "0123456789";
    }

    var password = "";
    for (var i = 0; i < passwordLength; i++) {
      var randomIndex = Math.floor(Math.random() * characterSet.length);
      password += characterSet.charAt(randomIndex);
    }

    document.getElementById("generatedPassword").value = password;

    checkPasswordStrength(password);
  }

  function copiedPassword(){
    var copyText = document.getElementById("generatedPassword");
    copyText.select();
    copyText.setSelectionRange(0,99999);
    navigator.clipboard.writeText(copyText.value);
    alert("Text copied: " + copyText.value);
  }

  function checkPasswordStrength(password) {
    var result = document.getElementById('passwordStrength');
    var strength = getPasswordStrength(password);

    result.textContent = strength;
  }

  function getPasswordStrength(password) {
    if (password.length < 6) {
      return 'Weak';
    }

    let strength = 0;

    if (password.length >= 6) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[\W]+/)) strength++;

    switch (strength) {
      case 1:
      case 2:
          return "Weak";
      case 3:
          return "Medium";
      case 4:
      case 5:
          return "Strong";
      default:
          return "Very weak";
    }
}