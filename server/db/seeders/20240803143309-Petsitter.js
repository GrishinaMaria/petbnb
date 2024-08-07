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
      description: 'Меня зовут Сергей, я из Новосибирска, но уже 10 лет живу в Москве со своей прекрасной двухлетней собакой по имени Твикс. Твикс полностью изменил мою жизнь, и я не могу представить свой день без собак. Твикс — любящий и общительный пес, который обожает проводить время с другими собаками. Именно это и мотивировало меня стать петситтером. Не только моя любовь к животным, но и то, как компания приносит радость Твиксу, вдохновляет меня.<br>Я вырос с собаками и кошками, но с тех пор как завел Твикса и переехал в Москву, мне было трудно найти кого-то, кто мог бы ухаживать за ним. Поэтому я решил присоединиться к Petbnb, чтобы помочь другим избежать такой же проблемы.<br>Я работаю из дома по понедельникам и пятницам, а также доступен в выходные для дневного ухода за собаками, прогулок и размещения собак.<br>С нетерпением жду встречи и буду рад помочь вам!',
      experience: 5,
      photo: 'https://sniffeandlikkit.com/cdn/shop/articles/tadeusz-lakota-tk5LWGNiWVs-unsplash.jpg?v=1684406144',
      geoX: 56.00512,
      geoY: 37.48319,
      city: 'Москва',
      phone: '+79152202263',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Ирина',
      email: 'irina@mail.ru',
      password: '$2b$10$fTtEvKubhLDI0qIi2W36guInsmY78RxRO3uR2jq4uod.QBjYwVY7i',
      role: 'sitter',
      description: 'Являюсь студенткой юридического факультета СПбГУ и владею свободным временем, чтобы позаботиться о Ваших питомцах, когда Вы в отъезде или слишком загружены. Отлично лажу со всеми животными, т.к. очень открыта и безмерно люблю общение с ними. Ранее проживала и ухаживала 5 лет за собакой породы Шарпей пока жила с родителями. А у бабушек всегда жили коты, поэтому в детстве все каникулы проводила с ними. Проживаю рядом со скверами и парками, которые отлично подойдут для прогулок, а в квартире есть место для комфортного проживания собаки или кота. Все рекомендации и пожелания для передержек и выгулов будут строго мной соблюдены, а Вы получите огромное количество фотографий и видео с Вашим любимцем и конечно же скриншоты трекеров движения при прогулках. Буду рада познакомиться с Вами и Вашими четвероногими друзьями! Выгул только в ближайших районах.',
      experience: 2,
      photo: 'https://petsitters.by/img/sitters/s1.jpg',
      geoX: 59.57028,
      geoY: 30.14856,
      city: 'Санкт-Петербург',
      phone: '+79230981122',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Владислав',
      email: 'vladislav@mail.ru',
      password: '$2b$10$fTtEvKubhLDI0qIi2W36guInsmY78RxRO3uR2jq4uod.QBjYwVY7i',
      role: 'sitter',
      description: 'С детства жил в небольшом городке в одном доме с котом и собакой (немецкая овчарка), но уже более 4-х лет живу в Калининграде и, к сожалению, не имею возможности завести себе домашнего питомца. Однако благодаря данному сервису я могу постоянно контактировать с вашими любимцами.<br>В животных я души не чаю: за моими плечами десятки выгулов и несколько передержек. За время работы на платформе мне удалось встретиться с самыми разнообразными и по размеру, и по характеру, и, конечно же, по породе (немецкая овчарка, хаски, ротвейлер, доберман, кане-корсо, французский бульдог, бигль, шпиц, мальтийская болонка, джек-рассел-терьер, ирландский сеттер и др.) питомцами.<br>Я понимаю, как сильно вы любите своих питомцев. Поэтому я невероятно ответственно отношусь к работе, поручаемой мне. Обещаю, что со мной ваш питомец будет чувствовать себя максимально комфортно, а вы сможете расслабиться: после каждого выгула я делюсь отчетом в виде трекера и фотографий.',
      experience: 6,
      photo: 'https://petsitters.by/uploads/cache/500x/9b/ea/8d/image1600348389_yc61RsLt8dCeS8jg.jpg',
      geoX: 54.71908,
      geoY: 20.43498,
      city: 'Калининград',
      phone: '+79330981122',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Светлана',
      email: 'svetlana@mail.ru',
      password: '$2b$10$fTtEvKubhLDI0qIi2W36guInsmY78RxRO3uR2jq4uod.QBjYwVY7i',
      role: 'sitter',
      description: 'Привет. Я - Света. Обожаю хвостики, все без исключения. С детства со мной живет кто-то из них. С удовольствием познакомлюсь и погуляю с новым другом пока вы в отъезде/заняты или побуду няней для котика/собачки/шиншилы/попугая/хомячка (покормить/поиграть/приласкать), фото-видео отчет ежедневно. Живу рядом с парком - для активных игр и веселья просто отличное место, также есть закрытая площадка для собак, где можно побегать без поводка. Буду рада знакомству и оказать помощь!',
      experience: 4,
      photo: 'https://petsitters.by/uploads/cache/1000x1000/de/19/34/image1662556525_c1NotKzQoMNADqyK.jpg',
      geoX: 55.79395,
      geoY: 49.23107,
      city: 'Казань',
      phone: '+79330981122',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Софья',
      email: 'sofia@mail.ru',
      password: '$2b$10$fTtEvKubhLDI0qIi2W36guInsmY78RxRO3uR2jq4uod.QBjYwVY7i',
      role: 'sitter',
      description: 'Здравствуйте. Меня зовут Софья. Я из небольшого городка над Гомелем. Первой моей собакой была кавказская овчарка по имени Макс. Именно он показал мне, какая искренняя и верная любовь у животных. И мне захотелось дарить им такую же. Потом в моей жизни появилась прекрасная кошка Милка и моя любовь к животным увеличилась вдвое. Сейчас мне 23. К сожалению, своих животных пока завести не могу. Но я буду очень рада подружиться с вашим хвостиком, выгулять его или взять на время к себе и помочь как можно легче пережить разлуку с хозяином, подарив свою любовь и заботу!',
      experience: 2,
      photo: 'https://petsitters.by/uploads/cache/1000x1000/17/3c/53/image1645464320_tURJdgRPPyVNrcT8.jpeg',
      geoX: 64.54049,
      geoY: 40.56612,
      city: 'Архангельск',
      phone: '+79330981890',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Яна',
      email: 'yana@mail.ru',
      password: '$2b$10$fTtEvKubhLDI0qIi2W36guInsmY78RxRO3uR2jq4uod.QBjYwVY7i',
      role: 'sitter',
      description: 'Привет, хозяин! Меня зовут Яна. Живу в центре города, недалеко от дома много парков, зелёной зоны. Работаю удаленно, свободный график. Мечтаю о своей большой собаке в загородном доме. И о малыше Кавалер кинг-чарльз-спаниеле.<br>Имела удовольствие ухаживать за собаками, такими как: доберман, чьи родители титулованные чемпионы мира, бигль, лабрадор, хаски, французский бульдог, спаниели, ризеншнауцер, тайский риджбек. Были на передержке метисы, йорк терьеры, сиба ину, шпицы, корги и многие другие. В детстве был сиамский балинез. Создала свою платформу по передержке в Турции, ухаживала за питомцами там, около года, есть опыт с иностранными хозяевами.<br>Отдаю все своё время, любовь и заботу вашим хвостикам для активного, здорового и уютного содержания у себя дома. Очень люблю проводить время на природе, за городом, на даче. Вы будете получать массу фотографии и отчетов каждый день. С удовольствием заменю Вас во время отъезда и стану лучшим другом для вашего питомца!',
      experience: 10,
      photo: 'https://petsitters.by/uploads/cache/1000x1000/f6/de/0f/image1622894329_gmuKVfioONO62DKG.jpeg',
      geoX: 52.59978,
      geoY: 39.58404,
      city: 'Липецк',
      phone: '+79159003443',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Александр',
      email: 'alexander@mail.ru',
      password: '$2b$10$fTtEvKubhLDI0qIi2W36guInsmY78RxRO3uR2jq4uod.QBjYwVY7i',
      role: 'sitter',
      description: 'Всем привет, меня зовут Александр и я обожаю животных всех видов! В данный момент со мной живет молодой кобель акита-ину по кличке Кичиро. Также имеют опыт передержки с двумя большими собаками. Всю жизнь прожил с котами, последние годы у меня были только собаки, поэтому готов взять ваших пушистиков на передержку или помочь с выгулом. Опыт большой и разнообразный. Живу в 3к квартире, есть машина, так что могу вывозить животных на груминг или к врачу при необходимости. Также если животные не подружатся, то есть возможность просто физически их разграничить. Не беру к себе на передержку щенков или собак, которые не могут оставаться дома одни, спасибо за понимание.',
      experience: 1,
      photo: 'https://petsitters.by/uploads/cache/1000x1000/93/87/b3/image1663071403_PSR78agQ3SQe2umV.jpg',
      geoX: 55.59572,
      geoY: 38.11765,
      city: 'Жуковский',
      phone: '+79159003000',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Марина',
      email: 'marina@mail.ru',
      password: '$2b$10$fTtEvKubhLDI0qIi2W36guInsmY78RxRO3uR2jq4uod.QBjYwVY7i',
      role: 'sitter',
      description: 'Всю жизнь были животные (кошки, собаки, хомяк, птицы). Сейчас у меня дома 2 кота, кошка и 2 собаки. Со своей собакой занимаюсь аджилити, обидиенс и ноузворк. На выгуле (передержке) ваши рекомендации будут соблюдены, сделаю фото/видео отчет прогулки. Если собака слышит команды и не сбегает, то может свободно гулять по участку под присмотром. Живу частном доме. Ваш хвостик может жить в отдельной комнате изолировано от моих. На передержку беру собачек размером с Бигля и меньше. Кобелей только кастрированных.',
      experience: 2,
      photo: 'https://petsitters.by/uploads/cache/1000x1000/1e/58/22/image1656329767_3aRVbVp6VwAuy6ks.jpg',
      geoX: 47.14756,
      geoY: 39.65308,
      city: 'Ростов-на-Дону',
      phone: '+79159003008',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Андрей',
      email: 'andrey@mail.ru',
      password: '$2b$10$fTtEvKubhLDI0qIi2W36guInsmY78RxRO3uR2jq4uod.QBjYwVY7i',
      role: 'sitter',
      description: 'Занимаюсь организацией - пеших походов, в формате дог-трекинга; йоги с участием собак ассистентов; фотосессий с собаками. Так же практикующий кинолог. Огромнейший опыт работы со сложными собаками. Очень внимательно отношусь , к вашим правилам и пожеланиям . Буду рад вам помочь!',
      experience: 4,
      photo: 'https://petsitters.by/uploads/cache/1000x1000/2f/5c/26/image1698218346_KdqVVrgXJgeq7tD7.jpg',
      geoX: 61.78903,
      geoY: 34.35696,
      city: 'Петрозаводск',
      phone: '+79159003027',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Милана',
      email: 'milana@mail.ru',
      password: '$2b$10$fTtEvKubhLDI0qIi2W36guInsmY78RxRO3uR2jq4uod.QBjYwVY7i',
      role: 'sitter',
      description: 'Меня зовут Милана, мне 30 лет. Живу в двухкомнатной квартире. Я почти всегда нахожусь дома.Я очень люблю животных. С кошками с детства дружу. У меня есть кошка Дженни. С собаками тоже хорошо лажу и был опыт передержки. Есть опыт с биглями.',
      experience: 3,
      photo: 'https://petsitters.by/uploads/cache/1000x1000/f2/9a/66/image1664970536_MmR8w9GdC2K0JFY8.jpg',
      geoX: 55.72016,
      geoY: 37.39911,
      city: 'Москва',
      phone: '+79159003027',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Иван',
      email: 'ivan@mail.ru',
      password: '$2b$10$fTtEvKubhLDI0qIi2W36guInsmY78RxRO3uR2jq4uod.QBjYwVY7i',
      role: 'sitter',
      description: 'Добрый, отзывчивый, порядочный. Люблю животных. Опыт больше 8 лет. Ко всем собакам найду подход. Накормлю, поиграю. Живу в частном доме.',
      experience: 8,
      photo: 'https://s3-media0.fl.yelpcdn.com/bphoto/cA9mVw6TJfx0ahcaXgljOg/348s.jpg',
      geoX: 59.79682,
      geoY: 30.37247,
      city: 'Санкт-Петербург',
      phone: '+79118904534',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Матвей',
      email: 'matvey@mail.ru',
      password: '$2b$10$fTtEvKubhLDI0qIi2W36guInsmY78RxRO3uR2jq4uod.QBjYwVY7i',
      role: 'sitter',
      description: 'Привет! Я Матвей, и мне было бы приятно позаботиться о вашей собаке или кошке. В течение 3,5 лет я регулярно ухаживал за очень милым французским бульдогом. Пока его хозяева на работе, я весь день нахожусь дома, играю и обнимаюсь с Мусей. Иногда я также провожу день, ухаживая за мальтийцем моего старого соседа или гаванцем родителей друга.<br>С тех пор как я начал пользоваться Petbnb, я ухаживал за множеством собак и всегда находил способ найти общий язык с ними. Кроме того, я являюсь постоянным выбором для друзей и знакомых, у которых есть кошки (одна или несколько), когда они уезжают в отпуск.<br>Я работаю пять дней в неделю, но я очень гибкий, когда дело касается работы из дома (моего или вашего). В свободное время я люблю играть в футбол и гулять (что особенно приятно с собакой).',
      experience: 3,
      photo: 'https://petsitters.by/uploads/cache/1000x1000/02/c4/06/image1694982352_v5TxqajeqIO8BtAi.jpeg',
      geoX: 54.62295,
      geoY: 39.7657,
      city: 'Рязань',
      phone: '+79118907090',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Анастасия',
      email: 'anastasia@mail.ru',
      password: '$2b$10$fTtEvKubhLDI0qIi2W36guInsmY78RxRO3uR2jq4uod.QBjYwVY7i',
      role: 'sitter',
      description: 'Меня зовут Настя, мне 20, и я очень рада помочь вам с вашей собакой или котиком, если вы в отъезде или просто нет возможности и времени выгулять собачку.<br>Всю жизнь я взаимодействовала с животными и очень их люблю. В деревне у моих бабушки и дедушки жил мой любимый пёс, с которым мы летом ездили на озеро или гулять в лес, и я смеялась с того, как он мило ест чернику с куста :)<br>Несколько лет назад я переехала в Москву, здесь у меня есть кот (скотиш страйт), но он живёт с родственниками в доме за городом.<br>Сейчас у меня нет возможности завести себе собаку, а любовь к ним осталась такой же сильной, поэтому я получаю огромное удовольствие, проводя с ними время. Могу погулять с вашей собакой, могу поухаживать за котиком, или даже попугайчиком (есть большой опыт ухода за ними), так что всегда рада новым заказам!',
      experience: 4,
      photo: 'https://petsitters.by/uploads/cache/1000x1000/54/0b/7a/image1649927634_IJugYSTSYEjpXROK.jpg',
      geoX: 55.94189,
      geoY: 37.31204,
      city: 'Москва',
      phone: '+79118904534',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ], {});

},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
