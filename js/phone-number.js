 // 전화번호 형식 검사
 document.getElementById("phoneNumber").addEventListener("input", function() {
    const phoneNumber = this.value;
    const pattern = /^\d{3}-\d{4}-\d{4}$/;

    if (!pattern.test(phoneNumber)) {
        this.setCustomValidity("전화번호 형식에 맞게 입력하세요. (ex: 010-1234-5678)");
    } else {
        this.setCustomValidity("");
    }
});