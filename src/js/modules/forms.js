const forms = () => {
  const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');

  const message = {
    loading: 'Загрузка...',
    succces: 'Спасибо! Скоро мы с Вами свяжемся',
    error: 'Что-то пошло не так...'
  };

  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;
    let res = await fetch(url, {
      method: "POST",
      body: data
    });

    return await res.text();
  };

  const clearInputs = () => {
    inputs.forEach(item => {
      item.value = '';
    });
  };

  form.forEach(item => {
    item.addEventListener('submit', e => {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.appendChild(statusMessage);

      const formData = new FormData(item);

      postData('assets/server.php', formData)
              .then(res => {
                console.log(res);
                statusMessage.textContent = message.succces;
              })
              .catch(() => statusMessage.textContent = message.error)
              .finally(() => {
                clearInputs();
                setTimeout(() => {
                  statusMessage.remove();
                }, 10000);
              });
    });
  });
};

export default forms;