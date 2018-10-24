/* Add Course Specific JavaScript Below */
const baseUrl = 'https://byui-cit.github.io/cit380/';
const localUrl = '/';
const menu = {
  resources: [
    { url: 'resources/syllabus.html', name: 'Syllabus' },
    { url: 'resources/w1-notes.html', name: 'W1 instructor notes' },
    {
      url: 'resources/course-overview.html',
      name: 'Course Overview-Instructor'
    }
  ],
  activites: [
    { url: 'activities/w1-overview.html', name: 'W01 Overview', week: 1 },
    { url: 'activities/icebreaker.html', name: 'Icebreaker', week: 1 }
  ]
};

function getView(url) {
  url = localUrl + url;
  fetch(url).then(response => {
    response.text().then(partial => {
      var tmp = document.implementation.createHTMLDocument();
      tmp.body.innerHTML = partial;
      const images = tmp.querySelectorAll('img');
      images.forEach(image => {
        const imgParts = image.src.split('/');
        image.src = baseUrl + 'images/' + imgParts[imgParts.length - 1];
      });
      //tmp.querySelector('main');
      // console.dir(tmp.querySelector('main'));
      const container = document.getElementById('partialContainer');
      container.innerHTML = '';
      container.append(tmp.querySelector('main'));

      Prism.highlightAll();
      document.querySelector('.navToggle').checked = false;
    });
  });
}
getView('resources/syllabus.html');

function buildMenu() {
  const actList = document.getElementById('activitiesList');
  const resList = document.getElementById('resourcesList');

  //build Activities list first
  menu.activites.forEach(link => {
    let item = document.createElement('li');
    let anchor = document.createElement('a');
    anchor.href = link.url;
    anchor.innerHTML = `${link.name} (Week: ${link.week})`;
    anchor.addEventListener('click', e => {
      e.preventDefault();
      getView(link.url);
    });
    //item.innerHTML = `<a href="${link.url}" onclick="getView('${link.url}')">${link.name} (Week: ${link.week})</a>`;
    item.appendChild(anchor);
    actList.appendChild(item);
  });
  menu.resources.forEach(link => {
    let item = document.createElement('li');
    let anchor = document.createElement('a');
    anchor.href = link.url;
    anchor.innerHTML = link.name;
    anchor.addEventListener('click', e => {
      e.preventDefault();
      getView(link.url);
    });

    //item.innerHTML = `<a href="${link.url}">${link.name}</a>`;
    item.appendChild(anchor);
    resList.appendChild(item);
  });
}
buildMenu();

// document.getElementById('one').addEventListener('click', e => {
//   document.querySelector('main').scrollBy({
//     top: 0, // could be negative value
//     left: document.body.scrollWidth,
//     behavior: 'smooth'
//   });
// });
