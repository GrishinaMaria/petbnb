'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [{
      username: 'Анна',
      email: 'anna@mail.ru',
      password: '$2b$10$fTtEvKubhLDI0qIi2W36guInsmY78RxRO3uR2jq4uod.QBjYwVY7i',
      role: 'sitter',
      description: 'Привет! Меня зовут Анна, мне 25 лет, и у меня две большие страсти в жизни: животные и еда! Я работаю менеджером по продуктам питания в центральном офисе и живу в Москве. Мне очень не хватает общения с животными, поэтому я с радостью позабочусь о вашей собаке или кошке!<br>Поскольку я не могу завести собственное домашнее животное из-за недостатка места и времени, это приложение - идеальная ситуация для всех! Вы довольны, ваш питомец счастлив, и я тоже.<br>Мой опыт:<br>С детства я росла с разными животными у родителей, всегда было минимум одна собака и одна кошка. Часто собаки друзей или семьи оставались у нас, когда хозяева уезжали в отпуск. Когда я стала старше, я иногда жила у знакомых, чтобы ухаживать за их собаками во время их отсутствия.<br>У меня в основном опыт с большими собаками и кошками, но я люблю и маленьких собачек! Я надежна, ответственна, добрая, но также последовательная (что очень важно для собак, они любят четкость).<br>Сейчас я работаю 35 часов в неделю, с выходным в каждую вторую пятницу. В будние дни я на работе и могу заниматься питомцем с 6 до 8 утра и после 18:00. Иногда я уезжаю к родителям на выходные. После работы я люблю прогуляться и было бы здорово делать это с собакой!<br>Я предпочитаю приходить к вам домой, чтобы ваш питомец чувствовал себя комфортно в привычной обстановке. Я буду заботиться о вашем питомце, как о собственном ребенке, и держать вас в курсе в течение дня, если вам это нужно. К сожалению, я не могу принимать животных у себя дома, так как у моего соседа уже есть кролик, и мое жилье слишком маленькое для еще одного животного.<br>Не стесняйтесь написать мне! Я с радостью познакомлюсь с вашим питомцем и узнаю, какие у вас и у вашего питомца пожелания.',
      experience: 3,
      photo: 'https://images.petstatic.com/_thumb/media/profile/255002.jpg',
      geoX: 55.78156,
      geoY: 37.47803,
      city: 'Москва',
      phone: '+79230987777',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Эльмира',
      email: 'elmira@mail.ru',
      password: '$2b$10$fTtEvKubhLDI0qIi2W36guInsmY78RxRO3uR2jq4uod.QBjYwVY7i',
      role: 'sitter',
      description: 'Привет! Меня зовут Эльмира, я из Армении, сейчас учусь в Санкт-Петербурге. Я выросла с кошкой и собакой у себя дома, и очень скучаю по ним. Хочу снова ощутить это чувство, ухаживая за животными и играя с ними.<br>У меня есть опыт ухода за собаками друзей (джек рассел, корги и золотистый ретривер). Мне очень нравится водить их в парки, заниматься спортом или просто бегать с ними, а также сидеть, играть на гитаре и петь им спокойные песни :)',
      experience: 1,
      photo: 'https://images.petstatic.com/_thumb/media/profile/264966.jpg',
      geoX: 59.93685,
      geoY: 30.24786,
      city: 'Санкт-Петербург',
      phone: '+79117707700',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Данил',
      email: 'danil@mail.ru',
      password: '$2b$10$fTtEvKubhLDI0qIi2W36guInsmY78RxRO3uR2jq4uod.QBjYwVY7i',
      role: 'sitter',
      description: 'Меня зовут Данил, я вырос с кошками и собаками и работал несколько лет в зоомагазине в Москве. Мои знакомые всегда хвалили меня за мое обращение с кошками.<br>У меня есть собственная кошка Нона, а наша собака Лара к сожалению, умерла этой весной. Это принесло нам много печали.<br>В данный момент я живу с мамой и, возможно, к концу года у меня появится собственное жилье. После завершения учебы и летней работы, я хочу спокойно подумать о дальнейших планах. В любом случае, я планирую пройти онлайн-курс по уходу за животными. Я с нетерпением жду возможности встретить новых животных и заботиться о них с любовью. Мне бы хотелось ухаживать за вашей кошкой и/или собакой у вас дома, чтобы вы могли спокойно отправиться в поездку и наслаждаться отдыхом.',
      experience: 2,
      photo: 'https://images.petstatic.com/_thumb/media/profile/258600.jpg',
      geoX: 55.81401,
      geoY: 37.92815,
      city: 'Москва',
      phone: '+79230981122',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Настя',
      email: 'nastya@mail.ru',
      password: '$2b$10$fTtEvKubhLDI0qIi2W36guInsmY78RxRO3uR2jq4uod.QBjYwVY7i',
      role: 'sitter',
      description: 'Меня зовут Настя, я живу в Нижнем Новгороде. Кошки и маленькие собачки делают меня счастливой, и я скучаю по своим питомцам. Я выросла, играя с кошками и ухаживая за ними. Поэтому я решила стать няней для животных через Petbnb.<br>Я могу кормить, менять воду, играть с вашими питомцами, расчесывать их, убирать туалет, выгуливать и выкидывать мусор. Во время визита я буду фотографировать вашего питомца и отправлять вам снимки.<br>Я могу посещать вашего питомца регулярно, и мой график гибкий.<br>Надеюсь увидеть вашего питомца скоро :)',
      experience: 2,
      photo: 'https://i.pinimg.com/236x/5e/ef/2f/5eef2fddf08e449c554905bb940ec69d.jpg',
      geoX: 56.31413,
      geoY: 44.00128,
      city: 'Нижний Новгород',
      phone: '+79152202200',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Сергей',
      email: 'sergey@mail.ru',
      password: '$2b$10$fTtEvKubhLDI0qIi2W36guInsmY78RxRO3uR2jq4uod.QBjYwVY7i',
      role: 'sitter',
      description: 'Меня зовут Сергей, я из Новосибирска, но уже 10 лет живу в Калининграде со своей прекрасной двухлетней собакой по имени Твикс. Твикс полностью изменил мою жизнь, и я не могу представить свой день без собак. Твикс — любящий и общительный пес, который обожает проводить время с другими собаками. Именно это и мотивировало меня стать петситтером. Не только моя любовь к животным, но и то, как компания приносит радость Твиксу, вдохновляет меня.<br>Я вырос с собаками и кошками, но с тех пор как завел Твикса и переехал в Калининград, мне было трудно найти кого-то, кто мог бы ухаживать за ним. Поэтому я решил присоединиться к Petbnb, чтобы помочь другим избежать такой же проблемы.<br>Я работаю из дома по понедельникам и пятницам, а также доступен в выходные для дневного ухода за собаками, прогулок и размещения собак.<br>С нетерпением жду встречи и буду рад помочь вам!',
      experience: 5,
      photo: 'https://sniffeandlikkit.com/cdn/shop/articles/tadeusz-lakota-tk5LWGNiWVs-unsplash.jpg?v=1684406144',
      geoX: 54.71908,
      geoY: 20.43498,
      city: 'Калининград',
      phone: '+79152202200',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});

},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
