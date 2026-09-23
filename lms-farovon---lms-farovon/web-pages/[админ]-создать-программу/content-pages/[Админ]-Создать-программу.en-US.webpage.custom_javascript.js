var documentbodyContents;
var courseImageType;
var courseImageName = '';

//File upload function called by the PCF
window.uploadImagePCF = function (name, memetype, body) {
  courseImageType = memetype;
  courseImageName = name;
  documentbodyContents = body.substring(body.indexOf(',') + 1);
};

$(function () {
  //ON PAGE LOAD
  $(document).ready(function () {
    //Create Course record
    $('#createButton1').click(function (e) {
      // validation
      var isValid = true;
      if (typeof entityFormClientValidate === 'function') {
        if (entityFormClientValidate()) {
          if (typeof Page_ClientValidate === 'function') {
            if (Page_ClientValidate('')) {
              clearIsDirty();
              disableButtons();
              createCourse();
              this.value = '{{ snippets["Processing..."] }}';
            }
          } else {
            clearIsDirty();
            disableButtons();
            this.value = '{{ snippets["Processing..."] }}';
          }
        } else {
          isValid = false;
          return false;
        }
      } else {
        if (typeof Page_ClientValidate === 'function') {
          if (Page_ClientValidate('')) {
            clearIsDirty();
            disableButtons();
            this.value = '{{ snippets["Processing..."] }}';
          }
        } else {
          clearIsDirty();
          disableButtons();
          this.value = '{{ snippets["Processing..."] }}';
        }
      }
      WebForm_DoPostBackWithOptions(
        new WebForm_PostBackOptions(
          'ctl00$ContentContainer$EntityFormControl_5d59de143d3bec118c64000d3a8fd36d$InsertButton',
          '',
          true,
          '',
          '',
          false,
          true
        )
      );
    });
  });

  // Cancel and redirect
  const discardBtn = document.getElementById('confirmDiscard1');
  discardBtn.onclick = function (event) {
    window.location.href = '/admin/courses';
  };

  // Create button fix
  const formCreateBtn = $('#EntityFormPanel > div.actions').html();
  $('#mainContent > div > div > div > div:nth-child(5) > div > div:nth-child(2)').html(formCreateBtn);
  $('#mainContent > div > div > div > div:nth-child(5) > div > div:nth-child(2) > #InsertButton').css({
    width: '200px',
    height: '36px',
  });
  $('#InsertButton').first().css({
    display: 'none',
  });
});

function createCourse() {
  //required fields
  var courseName = null;
  var category = null;
  var maxCapacity = null;
  var startDate = null;
  var endDate = null;
  var registrationDate = null;

  if (document.getElementById('msdynce_coursename').value) {
    courseName = document.getElementById('msdynce_coursename').value;
  }
  if (document.getElementById('msdynce_coursecategory').value) {
    category = document.getElementById('msdynce_coursecategory').value;
  }
  if (document.getElementById('msdynce_registerationmaxcapacity').value) {
    maxCapacity = document.getElementById('msdynce_registerationmaxcapacity').value;
  }
  if (document.getElementById('msdynce_coursestartdateandtime_datepicker_description').value) {
    startDate = moment(
      Date.parse(document.getElementById('msdynce_coursestartdateandtime_datepicker_description').value)
    );
  }
  if (document.getElementById('msdynce_courseenddateandtime_datepicker_description').value) {
    endDate = moment(
      Date.parse(document.getElementById('msdynce_courseenddateandtime_datepicker_description').value)
    );
  }
  if (document.getElementById('msdynce_registerationdeadline_datepicker_description').value) {
    registrationDate = moment(
      Date.parse(document.getElementById('msdynce_registerationdeadline_datepicker_description').value)
    );
  }

  let dataObject = {
    msdynce_coursename: courseName,
    msdynce_coursecategory: category,
    msdynce_registerationmaxcapacity: maxCapacity,
    msdynce_coursestartdateandtime: startDate,
    msdynce_courseenddateandtime: endDate,
    msdynce_registerationdeadline: registrationDate,
  };

  if (document.getElementById('msdynce_instructorname').value) {
    dataObject['msdynce_InstructorName@odata.bind'] =
      '/contacts(' + document.getElementById('msdynce_instructorname').value + ')';
  }

  var courseTypeValues = '';
  var courseTypes = document
    .getElementById('msdynce_coursetype_i')
    .getElementsByClassName('msos-selecteditems-container')[0]
    .getElementsByTagName('ul')[0]
    .getElementsByTagName('li');
  if (courseTypes.length > 0) {
    dataObject['msdynce_coursetype'] = '';
    for (var i = 0; i < courseTypes.length; i++) {
      if (i !== courseTypes.length - 1) {
        courseTypeValues += courseTypes[i].dataset.value + ', ';
      } else {
        courseTypeValues += courseTypes[i].dataset.value;
      }
    }
    dataObject['msdynce_coursetype'] += courseTypeValues;
  }

  var oneTimeRadio = document.getElementById('msdynce_frequency_0');
  var recurringRadio = document.getElementById('msdynce_frequency_1');

  if (oneTimeRadio.checked) {
    dataObject['msdynce_frequency'] = document.getElementById('msdynce_frequency_0').value;
  }
  if (recurringRadio.checked) {
    dataObject['msdynce_frequency'] = document.getElementById('msdynce_frequency_1').value;
  }

  if (document.getElementById('msdynce_coursedescription').value) {
    dataObject['msdynce_coursedescription'] = document.getElementById('msdynce_coursedescription').value;
  }

  var gradeLevelValues = '';
  var gradeLevels = document
    .getElementById('msdynce_coursegradelevel_i')
    .getElementsByClassName('msos-selecteditems-container')[0]
    .getElementsByTagName('ul')[0]
    .getElementsByTagName('li');
  if (gradeLevels.length > 0) {
    dataObject['msdynce_coursegradelevel'] = '';
    for (var i = 0; i < gradeLevels.length; i++) {
      if (i !== gradeLevels.length - 1) {
        gradeLevelValues += gradeLevels[i].dataset.value + ', ';
      } else {
        gradeLevelValues += gradeLevels[i].dataset.value;
      }
    }
    dataObject['msdynce_coursegradelevel'] += gradeLevelValues;
  }

  var courseDaysValues = '';
  var courseDays = document
    .getElementById('msdynce_coursedays_i')
    .getElementsByClassName('msos-selecteditems-container')[0]
    .getElementsByTagName('ul')[0]
    .getElementsByTagName('li');
  if (courseDays.length > 0) {
    dataObject['msdynce_coursedays'] = '';
    for (var i = 0; i < courseDays.length; i++) {
      if (i !== courseDays.length - 1) {
        courseDaysValues += courseDays[i].dataset.value + ', ';
      } else {
        courseDaysValues += courseDays[i].dataset.value;
      }
    }
    dataObject['msdynce_coursedays'] += courseDaysValues;
  }

  if (documentbodyContents) {
    dataObject['msdynce_entityimage'] = documentbodyContents;
    dataObject['msdynce_entityimage_file_name'] = courseImageName;
    dataObject['msdynce_entityimage_file_type'] = courseImageType.substring(courseImageType.indexOf('/') + 1);
  }

  //Call the API.
  // ВАЖНО: редирект ТОЛЬКО в success — безусловный редирект после safeAjax обрывал
  // асинхронный POST навигацией, и курс (включая обложку) мог не создаться.
  webapi.safeAjax({
    type: 'POST',
    url: '/_api/msdynce_courses',
    contentType: 'application/json',
    data: JSON.stringify(dataObject),
    success: function (res, status, xhr) {
      window.location.href = '/admin/courses';
    },
    error: function (res, status, xhr) {
      console.log(res.responseText);
      alert('Не удалось создать курс. Детали в консоли (F12).');
      var btn = document.getElementById('createCourseButton');
      if (btn) { btn.disabled = false; btn.value = 'Создать'; btn.textContent = 'Создать'; }
    },
  });
}

// ── Русификация подписей формы: подписи полей приходят из Dataverse-формы
//    "Portal Course Form" на английском; переводим на клиенте (безопасно —
//    только точные совпадения). Повторные вызовы — для PCF (обложка), он рендерится позже.
function fvRuForm() {
  var RU = {
    'Course Name': 'Название курса',
    'Instructor': 'Преподаватель',
    'Format': 'Формат',
    'One-time event': 'Тип события',
    'Recurring': 'Повторяющийся',
    'Description': 'Описание',
    'Category': 'Категория',
    'Level': 'Уровень',
    'Max capacity': 'Вместимость',
    'Registration deadline': 'Дедлайн регистрации',
    'Start Date': 'Дата начала',
    'End Date': 'Дата окончания',
    'Start Time': 'Время начала',
    'End Time': 'Время окончания',
    'Day(s)': 'Дни проведения',
    'Frequency': 'Периодичность',
    'Upload media': 'Обложка курса',
    'Upload a jpg, png, or other compatible media file.': 'Загрузите jpg или png — это обложка курса.',
    'Submit': 'Сохранить',
    'Create': 'Создать',
    'Update': 'Сохранить'
  };
  $('.course-form-container, .course-form-header').find('label, h2, h3, h4, legend, p, span, div, button').each(function () {
    var el = this;
    if (el.children.length > 0) {
      // есть вложенные элементы (например * обязательности) — меняем только первый текстовый узел
      for (var i = 0; i < el.childNodes.length; i++) {
        var n = el.childNodes[i];
        if (n.nodeType === 3) {
          var t = (n.nodeValue || '').trim();
          if (RU[t]) { n.nodeValue = RU[t]; }
        }
      }
      return;
    }
    var txt = (el.textContent || '').trim();
    if (RU[txt]) { el.textContent = RU[txt]; }
  });
  $('.course-form-container input[type=submit], .course-form-container input[type=button], .btn-container input[type=submit], .btn-container input[type=button]').each(function () {
    var v = (this.value || '').trim();
    if (RU[v]) { this.value = RU[v]; }
  });
}
$(function () {
  fvRuForm();
  setTimeout(fvRuForm, 800);
  setTimeout(fvRuForm, 2500);
});
