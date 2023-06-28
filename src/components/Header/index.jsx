import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Logo, Search, Basket, ArrowRight } from '../Icons';
import style from './header.module.scss';
import socialData from '../SocialLink/socialData';
import SocialLink from '../SocialLink';
import menuData from '../MenuLink/menuData';
import MenuLink from '../MenuLink';

function Header() {
  // зміна розмірів та прозорості хедера при прокрутці
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
  }, []);

  // поточне значення введеного тексту в input та значення placeholder
  const [searchValue, setSearchValue] = useState('');

  function handleInputChange(e) {
    setSearchValue(e.target.value);
  }

  // відкриття бургер-меню
  const [isOpen, setIsOpen] = useState(false);

  function toggleBurgerMenu() {
    setIsOpen(!isOpen);
  }

  // прапор для компонентів, щоб не рендерити іх на десктопі
  const isDesktop = useMediaQuery({ minWidth: 993 });

  // показуємо та ховаємо радок пошуку input
  const [isSearchVisible, setSearchVisible] = useState(false);

  function toggleSearchView() {
    setSearchVisible(!isSearchVisible);
  }

  // відміна прокрутки при відкритому бургер меню
  useEffect(() => {
    if (!isDesktop && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isDesktop, isOpen]);

  // підсвічення пункту меню відповідно до сторінки на якій знаходиться користувач
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className={style.header}>
        <div className={`${style.header__wrapper} ${scrolled && style.header__scrolled}`}>
          <div className={style.header__container}>
            <div className={style.header__section}>
              <Link to="/">
                <div className={style.header__logo}>
                  <Logo />
                  <span className={style.header__title}>CRYPTER</span>
                </div>
              </Link>
              <div className={`${style.header__search} ${style.search}`}>
                <form action="" className={`${style.search__form} ${isSearchVisible ? style.active : ''} ${scrolled ? style.scrolled : null}`}>
                  <label htmlFor="searchInput" className={style.search__label}>
                    <input
                      id="searchInput"
                      type="text"
                      placeholder="Search"
                      className={style.search__input}
                      value={searchValue}
                      onChange={handleInputChange}
                    />
                    <Search />
                  </label>
                </form>
                {!isDesktop ? (
                  <button type="button" className={style.search__btn} onClick={toggleSearchView}>
                    <Search width={32} height={32} color="#202025" />
                  </button>
                ) : null}
              </div>
            </div>
            <nav className={`${style.nav} ${isOpen ? style.active : ''}`}>
              <div className={style.social}>
                <h2 className={style.social__title}>
                  <span>Join our</span>
                  <br />
                  <span>community</span>
                </h2>
                <ul className={style.social__list}>
                  {socialData.map(({type, url, icon}) => (
                    <SocialLink
                      key={type}
                      classLi={style.social__item}
                      url={url}
                      classUrl={style.social__link}
                      icon={icon('#010101')}
                  />
                  ))}
                </ul>
              </div>
              <ul className={style.nav__list}>
                {menuData.map(({type, page, text}) => (
                  type !== 'basket' && (
                    <MenuLink
                      key={type}
                      classItem={style.nav__item}
                      page={page}
                      isActive={isActive(page)}
                      classActive={style.activeLink}
                      closeBurgerMenu={() => toggleBurgerMenu()}
                      text={text}
                      isDesktop={isDesktop}
                  />
                  )
                ))}
                <li className={style.nav__item}>
                  {isDesktop ? (
                    <NavLink to="/cart">
                      <Basket width={35} height={35} color={isActive('/cart') ? '#9933ff' : '#202025'} />
                    </NavLink>
                  ) : (
                    <NavLink to="/cart" onClick={() => toggleBurgerMenu()}>
                      <span>shopping cart</span>
                      {!isDesktop ? <ArrowRight /> : null}
                    </NavLink>
                  )}
                </li>
              </ul>
            </nav>
            <button type="button" className={`${style.burger} ${isOpen ? style.active : ''}`} onClick={toggleBurgerMenu}> </button>
          </div>
        </div>
      </header>
      <div style={{backgroundColor: 'antiquewhite'}}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla sint illum, dolore reiciendis consequuntur nisi vel, dicta tempore adipisci in explicabo totam modi earum impedit blanditiis et nemo alias ducimus qui, distinctio beatae excepturi cupiditate est? Vitae, tempora neque sequi necessitatibus facere deserunt reiciendis soluta mollitia blanditiis error ratione quae dolores optio esse beatae. Facilis expedita laudantium veritatis accusantium totam ab, doloremque, non cumque voluptatibus obcaecati quidem delectus praesentium consequuntur perspiciatis tempore nostrum maiores culpa sit maxime dignissimos modi adipisci commodi tenetur sed. Harum autem neque, nisi hic excepturi eos iste illo expedita vel temporibus eum odit, aspernatur voluptatibus repudiandae! Corporis maiores illum velit aut exercitationem possimus voluptas molestiae illo. Recusandae odit, libero, vitae distinctio neque non nemo commodi officiis repellendus id, ducimus ipsum in ratione esse facere corporis iure. Quod voluptatem modi nemo cum veritatis tempora incidunt aperiam laudantium fugiat quam amet, necessitatibus aspernatur. Molestiae veniam cum provident commodi beatae, tempore nesciunt quam debitis rerum repudiandae reiciendis dolor, repellat animi, quod assumenda cupiditate modi labore expedita dignissimos explicabo suscipit eos pariatur asperiores porro? Corrupti modi quidem quod aliquid, ut sit voluptates in tenetur non id aspernatur animi fugit dicta, repellat illo. Reiciendis saepe nisi unde provident blanditiis voluptatibus asperiores quibusdam facere sit architecto? Repellat, nesciunt ratione? Magni provident totam officiis maxime repellat et dolorum praesentium sint reiciendis minus vel hic expedita a atque quaerat, fuga nam quia facilis consequuntur, rem eius error ipsum? Ex aliquid quo officiis quasi impedit? Rerum culpa possimus consequatur vitae optio necessitatibus tempora quo natus blanditiis numquam? Debitis perferendis doloribus recusandae fugiat sint. Enim et architecto quae provident porro sapiente quisquam rem nobis molestias quo autem, odit sint culpa! Vitae dicta cupiditate provident, minima repudiandae cum eum suscipit obcaecati corrupti aut minus optio, quibusdam sed commodi nulla fugit rerum qui nihil recusandae esse ipsum! Excepturi exercitationem optio reiciendis aut atque necessitatibus maxime obcaecati provident! Fuga laudantium unde reprehenderit amet obcaecati hic consequuntur aspernatur ea vero labore accusantium rerum, expedita magnam magni minus deleniti impedit, quaerat nulla eum enim! Iusto ut praesentium, vel commodi maiores sint repudiandae culpa obcaecati, dolor, aut atque? Voluptatum aperiam optio molestiae explicabo. Eligendi eos culpa deserunt provident possimus amet aspernatur ut, nulla cum repellat id, quam delectus! Odit, sequi dolore quas ducimus harum porro. Ipsum quam aspernatur magnam, voluptatibus dolorem quia culpa provident omnis ad odit, architecto voluptatum eos iste consectetur. A vero temporibus in expedita doloribus eligendi architecto esse itaque nostrum illum ea enim voluptatem veritatis nulla, modi repellat perferendis voluptate optio accusamus! Autem, adipisci? Eius non hic sunt magnam inventore provident dignissimos quo nisi! Facere, error excepturi. Perspiciatis eos sed cumque saepe eum neque iure maxime, odit voluptas quisquam iusto cum quaerat commodi tempore laborum tempora enim fuga, quos nam ex facilis. Distinctio mollitia error eos tempore odit obcaecati eum est! Officiis praesentium, molestias vero libero, doloribus non aliquam esse ratione eius atque sit quidem quos officia minima beatae quibusdam porro omnis ipsam. Eligendi iste nulla deleniti maxime, veritatis, repellendus minima rerum officiis debitis, architecto deserunt est non nobis aspernatur. Minima, dicta, voluptatibus veniam repellendus nobis voluptas hic rem quas molestias accusamus cupiditate qui dolorem illum? Eligendi placeat nesciunt, amet nisi enim rerum excepturi reiciendis, doloribus repudiandae, quasi ipsam? Deleniti voluptate quaerat, fugit eligendi rerum ducimus sunt fuga optio qui deserunt, perferendis expedita velit hic nisi commodi ullam esse, autem quod porro quos tenetur eveniet ad maiores. Eum vero nisi libero iure necessitatibus quam, non unde blanditiis laborum numquam esse deserunt qui, error praesentium excepturi inventore nobis consequatur nulla sapiente fuga? Quos, aspernatur. Unde, et quibusdam repellendus corrupti inventore voluptates blanditiis consequatur temporibus totam praesentium beatae deleniti maiores eos harum aliquam maxime voluptas? Sapiente, beatae ratione tempore praesentium possimus dicta, aspernatur alias voluptates, doloribus omnis asperiores corporis consequuntur. Obcaecati consequatur nulla perspiciatis similique perferendis illo! Eius dolores unde soluta et veritatis enim ducimus quia voluptates corporis porro! Quaerat distinctio, ducimus delectus culpa temporibus fuga, aspernatur laboriosam quas accusantium voluptatibus aliquam sed harum architecto similique consequatur dolore eveniet. Perferendis velit iusto praesentium numquam veritatis itaque quae rerum vitae quidem facere cupiditate iste laudantium dolorem sequi nobis dolor fugit consequuntur qui, eaque culpa, dolore commodi! Excepturi eligendi, nostrum dolorum, inventore non quos similique fugit rerum quo exercitationem et ad. Accusamus fuga perferendis odit ipsa rerum amet, distinctio optio. Molestiae laboriosam rem mollitia reprehenderit, fugiat officiis quisquam? Doloremque nemo quam nostrum, deleniti architecto corrupti quos expedita ab ut sunt omnis quia sit hic. Quis, expedita! Pariatur quae officia hic quam incidunt sit ullam nam ea doloribus nulla velit tempora corporis earum dolorum deleniti possimus dolore molestias rem, inventore temporibus praesentium. Mollitia iure velit quod? Culpa consequatur eius molestiae laboriosam quas assumenda, facilis voluptatem error quis porro vel neque optio adipisci rerum temporibus perferendis fuga aut officiis beatae modi soluta nihil quos. Corrupti, dolorem soluta? Numquam, officiis! Sequi, adipisci. Distinctio saepe doloribus officia dolor repellat quisquam nostrum debitis vel officiis, perspiciatis iste provident dolores cupiditate laudantium doloremque sapiente, enim quae voluptates voluptatem quis sequi molestiae eaque! Dolorem error voluptates laborum illum cupiditate, quaerat saepe explicabo. Obcaecati, rerum harum saepe minus ipsum id explicabo impedit sequi, ullam, ut accusantium sint voluptatem nostrum aperiam nemo modi labore nihil veritatis aliquid quisquam voluptate sed corporis illo quos? Amet sint accusamus vel molestias id beatae optio quibusdam a! Nostrum, placeat? Fuga perferendis illum sunt esse laboriosam repudiandae illo repellendus fugiat temporibus blanditiis hic officiis tenetur eveniet, iusto, numquam rerum excepturi architecto voluptate quae obcaecati quasi voluptatum? Nobis eum voluptatum distinctio, dolore nostrum quo rem repellat voluptates delectus amet consectetur quasi eos vitae quisquam, quaerat architecto nisi eveniet totam eligendi! Odio dicta consequatur cupiditate deleniti nostrum aut doloremque, maxime et eum a culpa vitae nobis quas. Earum, molestiae fugiat. Nam aliquid numquam, ducimus minima delectus a nisi ipsum pariatur voluptatem rerum quasi, officiis accusantium aperiam porro ipsa perspiciatis accusamus totam saepe ratione odit dignissimos perferendis! Accusantium doloribus illum recusandae a magnam minima aliquid enim laborum deserunt amet, quam aut tenetur suscipit dolores perspiciatis hic iusto doloremque nisi. Voluptatibus unde facilis, repudiandae quia excepturi quos distinctio animi, magnam nostrum eius minus, saepe reiciendis. Officia, deleniti, laborum quisquam facilis laudantium ratione, sapiente vel est dolores sint recusandae explicabo asperiores corporis voluptatum. Inventore mollitia rerum veritatis pariatur nostrum voluptate molestias accusantium quisquam minus, quo repellendus nam fugiat voluptatum. Impedit, sed molestias cumque non, voluptatem, totam consequatur quasi fugit natus sit repellat tenetur? Eos magni saepe ipsam dolor distinctio nulla facere totam quasi placeat ad recusandae laborum assumenda provident, quam officiis exercitationem atque dolore itaque quidem incidunt! Fugit fuga quasi delectus ipsam iure earum dolore eius dicta et? Saepe iste perferendis maxime dolore neque quidem eveniet, temporibus laboriosam qui! Reiciendis ducimus deserunt ab quaerat iusto qui architecto illo aperiam alias, inventore ea, consequatur eaque maiores dolor cupiditate nisi dignissimos illum. Dolores voluptate reiciendis iure animi reprehenderit adipisci praesentium. Consequuntur, architecto ad, asperiores ipsum deserunt fugit tempora odio, totam tempore quisquam commodi temporibus sit quibusdam inventore quod cum iste! Aperiam consequuntur possimus natus, voluptas dolorem illum dignissimos neque modi perspiciatis ad, nobis reprehenderit perferendis ratione similique reiciendis rerum maxime pariatur cum obcaecati non aut corrupti tempora! Voluptas, voluptatibus atque? Voluptates dolores eligendi eaque illum aspernatur dolorum suscipit aut voluptatem vitae, provident voluptate esse itaque amet sapiente. Omnis dignissimos commodi eveniet repudiandae illo, aut magni esse quis magnam architecto nisi odio laboriosam beatae. Rerum culpa quasi iure nemo qui excepturi commodi reiciendis reprehenderit? Corporis, voluptatum! Necessitatibus illo veritatis voluptatum iste? Accusantium nam ullam vel incidunt, a nulla nostrum quia natus pariatur eaque, sint harum expedita sed id minima facere dolorem nisi error molestiae. Ipsam, amet soluta aspernatur dicta consequatur impedit rerum, doloremque ab quaerat voluptatem nemo quo eligendi nulla exercitationem. Quam repellat earum dignissimos, ipsam vero delectus beatae iste provident atque eius non ipsa obcaecati doloremque illum aliquid! Cupiditate impedit similique quas voluptatum. In voluptatibus earum, quae, repellendus assumenda sed velit molestiae laudantium non repellat cum illum quod eaque, consequatur esse delectus. Nulla quos odit voluptas mollitia repellendus rem, sapiente perferendis architecto corrupti numquam sunt praesentium ipsum modi aliquam officia corporis dolorem! Fugiat, dolor autem consequatur enim quam voluptatum explicabo? Earum, repudiandae iure itaque officiis architecto commodi quibusdam consequuntur odio. Voluptatem exercitationem quos debitis error mollitia veritatis, accusamus earum, officia neque alias asperiores nulla et recusandae ipsum, laboriosam tempore. Perferendis iste nemo inventore, dolores magni sint nostrum minus voluptatibus nihil consequatur error placeat optio. Mollitia ut provident dolor, qui magni odit nemo est, sequi vel architecto necessitatibus id enim aperiam voluptatem ullam incidunt modi. Cumque repellendus vel obcaecati quo dolore reiciendis, ex totam vitae facere autem, quam veritatis animi officiis eaque aspernatur a minima rem veniam iusto voluptas sunt atque. Non corrupti consequuntur quod nam numquam, assumenda dolorem autem vitae explicabo enim voluptate nulla ipsam blanditiis sed, provident architecto ut distinctio, et ratione delectus sit? Exercitationem a voluptates, inventore qui neque itaque explicabo corporis illo placeat. Ratione error distinctio, iusto quia quo, impedit, tempora reprehenderit cupiditate commodi unde veniam ipsa. Sequi velit quibusdam et laboriosam temporibus cupiditate quas ea expedita molestiae exercitationem facilis animi obcaecati repudiandae quaerat laborum reprehenderit, in aspernatur quis, culpa voluptatum commodi! Assumenda ratione est aspernatur autem magni pariatur ipsam ipsum repellat, provident cumque omnis! Reiciendis magni autem ducimus beatae recusandae, eos tempora vel eligendi iste aperiam nisi pariatur repellat reprehenderit quia eveniet! Nemo in quisquam consequatur iusto, saepe ratione explicabo suscipit. Illo repudiandae quo aspernatur corporis maxime vitae maiores consequatur molestiae, vel expedita? Excepturi, asperiores unde quibusdam quis alias saepe, repellendus corrupti facilis quam minima optio quia praesentium est. Corrupti deserunt nisi esse, libero illum veritatis hic exercitationem molestiae ipsam, eos itaque enim placeat odit ullam, similique alias distinctio nam qui. Consequatur ipsa libero, tenetur sint tempore ab alias magnam officia esse soluta architecto eaque recusandae suscipit consectetur voluptatum officiis accusantium error illum, voluptates praesentium! Quis excepturi laudantium eius maxime veritatis necessitatibus, quae velit ipsam, voluptatibus atque, perferendis quam fuga repellendus? Odit atque porro soluta ducimus quo unde, rem cupiditate, laboriosam repellat sunt ab perferendis facere quos ipsam voluptates repellendus vel illum perspiciatis, dolores fuga? Ullam perferendis rem delectus reprehenderit tempora voluptatum nisi iusto asperiores necessitatibus maiores voluptate, corrupti adipisci laboriosam veniam inventore quidem fuga libero. Officia et minus ad, reiciendis quo, deserunt, veniam nisi excepturi asperiores sit iusto. Aut iusto architecto cupiditate, dolores porro necessitatibus atque odit asperiores numquam vel error animi dicta facere alias, obcaecati deserunt! Laborum, deleniti. Alias nulla ipsa corporis fugit ratione sunt deserunt praesentium aut dolorum voluptas dolores amet, tempora esse totam? Dolorum blanditiis optio cum, commodi harum voluptatibus rerum tempora ut repellendus est ipsum dolor officia ipsa, asperiores laborum architecto magni quaerat, corrupti illum quam dolore velit delectus. Et velit nobis vel sequi mollitia officiis odio exercitationem. Consectetur maxime dolores iure voluptate cupiditate facilis accusamus, iste pariatur rerum similique molestiae harum debitis, magnam eum nisi libero at! Suscipit excepturi temporibus cupiditate nam saepe quasi amet dolore ab fugit soluta, expedita ipsa incidunt voluptatem quibusdam aut. Possimus, rerum, inventore recusandae perspiciatis omnis itaque, quod sequi aliquam fugit ad deserunt in? Asperiores non atque ab rem inventore sequi aliquid perspiciatis, laudantium odio dicta, iusto, expedita ex quam recusandae assumenda? Odit minima deserunt, error voluptas, laudantium in magnam modi impedit recusandae repellat quibusdam officia pariatur animi esse. Voluptatum, aliquid assumenda! Beatae odit sequi expedita, quasi alias, quidem veniam pariatur explicabo nam consequatur ipsam, optio provident aliquam sint amet praesentium necessitatibus reiciendis quibusdam voluptas. Culpa cupiditate quidem tenetur architecto in repellat officiis impedit sit aliquam consequatur voluptas minus aut odio doloribus, optio beatae veritatis recusandae itaque nulla ab. Nisi quas modi, provident illo amet tempore optio molestias sit eius in. Impedit aspernatur ea nihil autem molestias quisquam? Accusamus minima nostrum odit aliquam nemo nobis consequatur tempore fugiat labore molestiae facere quos, neque rem est ratione sed placeat provident vel explicabo expedita? Distinctio libero reprehenderit voluptate perspiciatis, consequatur, laboriosam provident cumque, delectus sit rem maiores dolor veritatis ex. Minus nobis quam aliquam, ad dolor asperiores laborum! Voluptatem, assumenda eveniet atque modi ullam natus quaerat accusamus aperiam eos impedit repellendus quas qui vitae laboriosam officia? Quisquam est voluptatum tempora dolorum dolor soluta sit et aut eligendi officia, suscipit, natus obcaecati sint, necessitatibus voluptates tempore ex perferendis amet atque inventore. Laudantium repellat explicabo excepturi, quod, possimus velit repudiandae laboriosam voluptatibus officia at ut optio totam numquam, alias itaque assumenda et hic doloremque quas doloribus asperiores consequuntur dicta sed dolorem. Optio aspernatur, sunt quas cum nesciunt repellat delectus rerum dolorem, amet ad magni quia provident, voluptatum laudantium quos nisi cumque at eveniet laboriosam et. Temporibus, nesciunt, nam explicabo aliquam officiis deleniti dolores adipisci, quae velit cupiditate corporis est dolorem numquam error! Quo dolores animi eaque adipisci fugiat! Quibusdam rerum, iure voluptas, voluptate temporibus laudantium officiis cupiditate aspernatur dicta doloribus labore quia deleniti tempora accusamus, pariatur libero commodi deserunt dolore reprehenderit eaque. Quos vitae omnis natus quaerat numquam. Quo velit iste enim nulla vitae? Repudiandae distinctio nostrum porro voluptates, mollitia necessitatibus tenetur eaque quos rerum numquam aliquam beatae rem. Repudiandae, minus doloremque dolorem sequi enim saepe numquam libero! Voluptate reiciendis quidem blanditiis adipisci soluta odio, aut similique eveniet alias nemo voluptates consequuntur inventore quod tenetur praesentium magni laboriosam omnis tempore, molestias iusto cum velit quam sapiente. Ratione architecto esse provident tempore consectetur molestias libero aut quisquam molestiae omnis excepturi, pariatur repudiandae, ducimus minus quasi vitae doloribus quibusdam autem. Voluptas, totam. Ad aspernatur possimus, ea modi quidem necessitatibus eligendi, tenetur tempora dignissimos consequuntur assumenda? Expedita, dolor? Et, sit reprehenderit. Labore ratione eaque sunt. Dolor totam dolores voluptatibus quod ex eveniet quos libero odit. Minus natus saepe iure deleniti sint commodi veritatis excepturi repellendus libero, officiis temporibus pariatur omnis quidem eligendi veniam similique ipsum voluptatem fugit quis maxime facere. Impedit illum dolore voluptas, atque quisquam assumenda alias repellat deleniti commodi ratione autem maxime voluptatum libero et delectus fuga hic earum nostrum molestiae, repudiandae explicabo modi voluptates. Molestiae, ullam. Necessitatibus laborum ad consectetur, mollitia labore perspiciatis iusto similique impedit incidunt eligendi autem ut recusandae tenetur eos aut alias sunt architecto veniam cupiditate placeat amet delectus aliquam, fugit nesciunt. Voluptatibus, harum similique doloribus reiciendis voluptate deleniti blanditiis aut. Distinctio repudiandae debitis, corrupti modi quas dicta recusandae. Expedita deleniti id cupiditate, nulla adipisci consequatur modi quisquam debitis fugiat omnis dolor ipsa ea dolorum numquam repellat similique doloribus sed odio iste nisi aperiam earum, possimus obcaecati. Nostrum odio sed cumque magnam. Ratione tempora, temporibus, assumenda architecto, nulla eum omnis aliquid iure unde tempore quae sequi labore rerum cupiditate quibusdam quisquam atque consectetur! Mollitia dignissimos eaque ut debitis accusamus? Unde consequuntur blanditiis cupiditate aut dolore eligendi, ratione cum nesciunt reiciendis quibusdam incidunt laboriosam dolorum eum ex saepe earum odit voluptatum praesentium. Error ea doloremque vel minima id voluptatibus culpa beatae veritatis unde, maiores quidem totam debitis recusandae ipsum obcaecati, blanditiis impedit architecto quisquam deleniti cum quo doloribus voluptate labore? Sit voluptatum aliquid explicabo assumenda aspernatur earum ad esse quasi, vero nihil porro accusamus aliquam illum reprehenderit culpa rerum est unde, deleniti delectus harum facere ea molestiae! Magni, id eligendi ipsum repellendus odio sunt sequi quasi suscipit quidem laboriosam optio fuga. Quo, dolorem! Accusantium nostrum aperiam, nesciunt ut optio dolorum architecto consectetur, dolorem dignissimos inventore quasi eum dicta eaque suscipit eius error molestias quidem est fugiat consequuntur voluptatibus quae sint fuga illum. Quae ad suscipit ipsam facere impedit fugit vero quo voluptatum consequuntur nemo rerum repudiandae aspernatur voluptate doloremque laborum, quia dolorum adipisci molestiae, explicabo excepturi veniam ratione! Cupiditate vero nemo ab repudiandae debitis quaerat enim libero pariatur explicabo quia nostrum ex ea obcaecati dolor alias id, corporis voluptate? Tempore molestiae nostrum distinctio quaerat perferendis eligendi ad fugit, esse corporis consequuntur unde asperiores consequatur eveniet nemo sit debitis nam maxime tenetur repudiandae omnis? Beatae iusto dolore obcaecati fugiat ipsam nisi, sed dolores! Nulla totam dolorum quia voluptatum rerum obcaecati harum voluptatibus quae eos vel, neque provident perspiciatis velit. Odio iusto consequuntur mollitia nostrum veritatis esse deleniti commodi aspernatur suscipit consectetur. Sapiente cumque a unde laborum expedita, cum quo facere rerum asperiores saepe dolorum non repellat fugit placeat in commodi eos alias error, accusantium iste dignissimos natus aperiam adipisci! Reprehenderit alias animi eligendi repellat cum. Commodi quod consequatur magni eos soluta qui veritatis ipsam voluptatum voluptatibus dolorum quisquam eaque harum consectetur delectus molestias doloremque voluptates incidunt, voluptatem deserunt ut earum et fugit. Iste doloribus fugit cumque dolore aut eveniet, veritatis porro veniam minus est nihil et, aliquid ducimus natus ipsum quaerat mollitia.
      </div>
    </>
  );
}

export default Header;