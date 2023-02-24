const { $ } = require('../utils/DOM.js');

const display = {
  showBuyLottoCount(lottoCount) {
    $('.purchased-lotto-label').innerHTML = `총 ${lottoCount}개를 구매하였습니다.`;
  },

  showlottoNumbers(numbers) {
    $('.lotto-ticket-container').innerHTML += `<li class="mx-1 text-4xl d-flex items-center">
    🎟️
    <span class="lotto-numbers text-xl ml-5">${numbers.join(', ')}</span>
  </li>`;
  },
  showWinningNumberForm() {
    $('.winning-number-form').classList.remove('d-none');
    $('.winning-number-form')[0].focus();
  },
};

module.exports = display;
