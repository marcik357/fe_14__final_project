import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Logo, Search, Basket, ArrowRight, Instagram, Twitter, Facebook, Linkedin } from '../Icons';
import style from './header.module.scss';

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
              <ul className={style.social__list}>
                <h2 className={style.social__title}>
                  <span>Join our</span>
                  <br />
                  <span>community</span>
                </h2>
                <li className={style.social__item}>
                  <a href="https://www.instagram.com/nft_community/" className={style.social__link} target="_blank" rel="noreferrer">
                    <Instagram color="#010101" />
                  </a>
                </li>
                <li className={style.social__item}>
                  <a href="https://twitter.com/nft__community" className={style.social__link} target="_blank" rel="noreferrer">
                    <Twitter color="#010101" />
                  </a>
                </li>
                <li className={style.social__item}>
                  <a href="https://www.facebook.com/NFTCommunity" className={style.social__link} target="_blank" rel="noreferrer">
                    <Facebook color="#010101" />
                  </a>
                </li>
                <li className={style.social__item}>
                  <a href="https://www.linkedin.com/groups/13992662/" className={style.social__link} target="_blank" rel="noreferrer">
                    <Linkedin color="#010101" />
                  </a>
                </li>
              </ul>
              <ul className={style.nav__list}>
                <li className={style.nav__item}>
                  <NavLink to="/categories" className={isActive('/categories') ? style.activeLink : ''} onClick={() => toggleBurgerMenu()}>
                    <span>store</span>
                    {!isDesktop ? <ArrowRight /> : null}
                  </NavLink>
                </li>
                <li className={style.nav__item}>
                  <NavLink to="/blog" className={isActive('/blog') ? style.activeLink : ''} onClick={() => toggleBurgerMenu()}>
                    <span>blog</span>
                    {!isDesktop ? <ArrowRight /> : null}
                  </NavLink>
                </li>
                <li className={style.nav__item}>
                  <NavLink to="/help" className={isActive('/help') ? style.activeLink : ''} onClick={() => toggleBurgerMenu()}>
                    <span>help center</span>
                    {!isDesktop ? <ArrowRight /> : null}
                  </NavLink>
                </li>
                <li className={style.nav__item}>
                  {isDesktop ? (
                    <NavLink to="/cart">
                      <Basket width={35} height={35} color={isActive('/cart') ? '#9933ff' : '#202025'} />
                    </NavLink>
                  ) : (
                    <NavLink to="/cart" onClick={() => toggleBurgerMenu()}>
                      <span>Shopping Cart</span>
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
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia modi, perspiciatis beatae omnis quo aspernatur quis similique assumenda minus sequi eligendi voluptas, iure commodi debitis officiis. Dignissimos nostrum excepturi enim aperiam amet. Vel nam atque amet itaque, accusamus magni tenetur fugit nostrum ipsam ducimus eligendi voluptatibus possimus ipsum illum est odit sapiente. Voluptate tempora voluptatem impedit officia repudiandae sit. Quasi cupiditate, praesentium voluptate corporis dicta vitae? Ex id maxime quibusdam ipsa iure, cum ad doloribus molestiae deleniti, architecto impedit tempora, amet consequuntur voluptatibus unde blanditiis? Molestias sequi quia aut eum, eaque rerum quisquam delectus omnis. In dicta recusandae sed quidem minus expedita doloribus, eos cupiditate reiciendis illum sit est asperiores obcaecati! Reiciendis veritatis quae, vitae odio consectetur reprehenderit, perspiciatis neque hic necessitatibus laborum, aliquam libero totam doloremque architecto nihil atque temporibus voluptates quam. Explicabo modi at ut magni cupiditate nobis optio tenetur nemo error, facere aperiam et sint excepturi possimus fuga? Nemo officiis voluptates in, asperiores alias iusto possimus quia velit vero ullam impedit architecto voluptate, facilis error molestias consectetur dolores ducimus itaque, minus maxime nobis at provident excepturi. At veritatis quos voluptas dolor eius error amet accusantium eaque odit cumque a, illum pariatur sapiente itaque voluptates, neque modi earum. Et praesentium a, explicabo voluptate fuga velit reprehenderit ex unde sunt architecto perspiciatis, at laborum, qui inventore aut? Esse perspiciatis fuga porro debitis hic totam eligendi. Reiciendis, ea unde mollitia explicabo aperiam ut distinctio in quasi officiis consectetur voluptatum exercitationem nostrum odio fuga doloremque! Excepturi minus totam voluptas nostrum, asperiores quasi sed cum in consequuntur temporibus. Saepe sequi eaque quisquam doloremque dolorum similique ipsum soluta distinctio dolores, asperiores excepturi accusantium labore incidunt ipsam ratione molestiae placeat quasi! Possimus illum hic, maiores eos animi saepe nulla dolore cum, adipisci soluta minima impedit quae quas, debitis ut. Maiores voluptatum possimus autem ullam neque eveniet vitae optio quas numquam a amet impedit temporibus, ipsa harum tempore deleniti earum hic quidem nisi alias mollitia ab incidunt! Aspernatur, qui optio dolorem, deserunt blanditiis neque quae odio ab, eum in magnam! Fugit obcaecati laborum placeat architecto suscipit ad ducimus, qui quod officia mollitia sapiente ut fuga tenetur modi aut. Ipsa accusantium, voluptatibus atque modi autem voluptate. Ipsam soluta nobis cupiditate a quo cumque est, quasi aliquid, sunt neque ullam! Hic, molestiae possimus. Et corrupti amet dolore cupiditate, ut commodi earum illum dolorem harum rem distinctio nulla recusandae repudiandae atque est doloremque tenetur magni inventore veniam! Praesentium explicabo sequi, ipsam ad iure corrupti cumque! Ullam autem, veniam quibusdam sunt nemo fugiat nesciunt temporibus, distinctio quis assumenda sit soluta consequatur id libero est. Repellat provident recusandae magni dicta odio, voluptatum repellendus enim totam sit quos, ipsum cumque voluptate mollitia, numquam modi assumenda nihil dolores distinctio eveniet? Debitis, nulla, amet sunt expedita vel aperiam quis voluptatem dolores excepturi quae dolorum quas doloribus nostrum quia reiciendis repellendus dolor deleniti! Voluptatem tenetur quisquam perspiciatis quidem iure necessitatibus ipsa aliquid quae hic molestias. Repellat inventore rem iste. Aliquam, doloribus. Consequuntur praesentium maxime, amet quam, animi necessitatibus iure natus dolorem esse quae voluptatum officiis eveniet vel aspernatur fuga minus ut, odio non. Maiores nam optio porro, voluptatum consectetur cupiditate libero quos. Incidunt labore quia quos quas consequatur veritatis neque non, eligendi temporibus, delectus deleniti obcaecati. Omnis neque cumque, aperiam modi qui ipsa suscipit velit quam sapiente ab commodi doloribus, aliquam nesciunt pariatur ducimus vero provident voluptas deleniti alias quia adipisci sed aut eaque. Minima asperiores nulla, modi iure dolor ipsum in esse similique qui repellat consequuntur, quo quos ducimus saepe ex sint possimus distinctio obcaecati eum quidem voluptas quas. Delectus dolorem officia sequi, accusantium tempora maiores facere temporibus atque architecto, magni nisi. Minima magni aperiam voluptatum voluptates quo! Tenetur recusandae inventore dignissimos, perferendis labore consectetur corrupti! Fugit porro et saepe voluptatem tempora, quas suscipit numquam nisi adipisci aut repellendus, quibusdam accusantium perspiciatis laudantium vero ratione, laborum perferendis! Maxime, atque tempore. Modi officia cupiditate voluptatum cumque suscipit maxime expedita amet, eligendi quo qui labore consequuntur incidunt nihil? Consequuntur quos, soluta id necessitatibus molestias asperiores et. Sunt ipsa nobis totam corporis voluptate voluptatibus velit similique id, praesentium vero reprehenderit fuga. Assumenda quo quibusdam ullam voluptatem similique quidem cum nulla at quisquam tenetur, architecto voluptas placeat omnis quasi earum, quae inventore porro! Explicabo aperiam eos non, tempore sequi totam ipsum laudantium fugit porro? Dolorum illum totam odio iure consequuntur? Mollitia vero error laudantium! Sint quo alias dicta hic, aliquam quibusdam. Nobis fuga sunt quasi iure nam consectetur. Architecto voluptatem beatae nam cumque provident ut in adipisci quos. Ipsa adipisci obcaecati aliquid pariatur atque culpa, dolore, sunt architecto doloribus similique quas magni labore cumque. Laudantium necessitatibus eius, tempora hic aliquam sint itaque distinctio voluptatum inventore. Soluta mollitia iure, odio temporibus deleniti eos quis officiis ex a, aut sit provident minus totam quam suscipit minima excepturi laudantium. Velit necessitatibus vero maxime, recusandae cumque quas iste explicabo molestias rem a omnis impedit fugit harum dolor. Minima veritatis ipsa tempora odit quae? Laboriosam illum itaque placeat, explicabo id mollitia ab nesciunt obcaecati, enim molestias ullam nisi, repudiandae veniam exercitationem voluptatibus nemo fuga quod. Debitis ratione, facere, cupiditate illo fugit ipsum magni placeat mollitia autem temporibus, fugiat quo nesciunt a. Similique a nisi consequatur suscipit, neque, incidunt est accusamus inventore blanditiis aperiam culpa optio doloribus dolor officiis non, mollitia dicta? Sequi nemo veritatis suscipit voluptate laborum vero earum cumque, dolore dolores repellendus cum molestiae nostrum incidunt assumenda eveniet minima enim, deleniti obcaecati accusamus nam, quaerat ex? Veritatis asperiores, veniam fuga pariatur facilis voluptates architecto similique ipsum ad cumque omnis voluptas numquam deleniti a laboriosam assumenda sit, autem doloribus. Qui rerum, error eius vero voluptas necessitatibus earum consequatur a commodi quae, possimus nisi neque temporibus explicabo? Veritatis dolore mollitia assumenda consequatur explicabo at, porro optio natus cupiditate, dolorem repellat tenetur! Est tempora placeat tempore molestias maxime aliquam aut culpa maiores omnis. Repudiandae culpa rem repellat! Ad eos esse explicabo. Repellat voluptatem dolorem animi! Quo provident autem nobis. Ea sit voluptatum architecto debitis assumenda repudiandae, ipsam eveniet fuga recusandae eligendi placeat similique minima enim obcaecati pariatur illum dolorum quasi. Voluptate architecto, molestias explicabo quibusdam debitis accusamus qui recusandae dolores nihil numquam magnam velit? Tenetur quasi, molestiae exercitationem reprehenderit neque consequuntur dolorum quia id obcaecati illo magni nam, itaque, incidunt repellat debitis. Alias ipsum perferendis neque ex? Odit delectus quod veniam magnam earum libero quia dolorum repellendus cum eligendi, eos, modi consequatur debitis provident at, labore aperiam maxime temporibus neque. Sapiente fuga temporibus quas animi quidem, voluptatibus dolore molestiae cumque quisquam facilis, perferendis tenetur officiis quis quod cum! Non natus nemo quasi, deleniti facere, debitis eos modi provident cupiditate, sapiente aperiam inventore animi? Doloremque, qui. Animi at id provident odio nobis veniam ipsum? Sit tempore voluptatum veritatis pariatur facere amet vero vel architecto nostrum, quam maiores quo illo aspernatur. Mollitia minus dolorum perferendis, repellat a quidem est vitae atque, illum voluptatum ipsum optio consequatur! Earum placeat quos animi repellat cupiditate soluta nisi, architecto neque in corrupti accusamus reprehenderit, iusto rerum voluptatum minus voluptates mollitia dolores nobis nesciunt dolore ducimus. Dolor minus, omnis sunt temporibus saepe cumque magnam error incidunt totam itaque ipsam voluptatum eos quos, enim maiores assumenda molestias corrupti qui. Dolorem fuga vero asperiores repudiandae natus? Animi veritatis eos eum debitis illum unde asperiores. Harum nesciunt eligendi ipsa? Suscipit omnis enim ipsum, tenetur molestiae architecto! Exercitationem quos aut, iure incidunt laudantium sit delectus modi doloribus dicta a odio molestias omnis, dignissimos natus magnam itaque, sapiente unde ut provident aspernatur obcaecati doloremque ducimus? Magni consequuntur enim exercitationem impedit dolor accusantium voluptatum error reprehenderit sunt, dignissimos veniam debitis autem porro, ducimus neque consequatur quis quae dolorem minima! Laudantium ad eius, rerum cupiditate mollitia nostrum repudiandae dolores soluta voluptates tempora omnis magnam perferendis reiciendis laborum debitis consequatur necessitatibus quam sunt laboriosam fugit eum magni sit. Modi deserunt ipsum quia dignissimos nulla quisquam iste totam provident! Similique, qui saepe laborum, itaque iste amet, blanditiis asperiores provident quas numquam a unde excepturi accusamus in! Error quidem, natus illum explicabo sit illo tenetur deleniti, provident, doloribus doloremque fugiat quasi cumque maxime ea amet commodi accusamus et ad rerum distinctio. Eligendi consectetur repudiandae id nulla voluptate, voluptas blanditiis alias tempora rerum, minima quod iste sint fuga? Iure perferendis facilis cumque cum doloribus ducimus hic quaerat. Natus esse sapiente, vero libero voluptatibus quidem. Eos accusamus est dignissimos laboriosam, esse cupiditate, quo amet nostrum molestias iste perferendis et. Maiores perferendis alias labore, hic culpa ut qui ex eum asperiores quis veniam earum! Rem asperiores voluptatibus pariatur error. Sit, eius. Provident magni nam quam maiores vel et amet omnis atque possimus ea ipsum tempora dicta totam expedita, eum minima repellendus. Sit labore consequatur facilis qui quod sint molestias necessitatibus alias tempora ullam laborum veritatis cumque, officiis ipsam blanditiis fuga voluptatum quasi incidunt officia doloribus in earum illum molestiae! Officiis ipsam nesciunt et tempora ratione, alias repellat quae odio obcaecati, ad quas. Id ducimus est hic, voluptatem autem nesciunt optio amet officiis quisquam dolorem dolorum vero sequi non, repellendus et ad! Quas libero ut minus vero, explicabo officiis laboriosam et quaerat? Incidunt rerum vitae nesciunt, perferendis cupiditate, libero fuga nihil culpa magnam voluptate sequi totam illo minus, quae rem! Mollitia ad atque quo harum placeat repellendus rem delectus, tenetur ullam, libero labore enim omnis culpa dolor pariatur accusantium voluptates officia laborum consequuntur? Temporibus totam iusto at, maiores recusandae deserunt facilis rem alias reprehenderit quae perferendis ut. Commodi nihil facilis, quasi illum sit dolore a, nisi alias, veritatis earum quam. Ullam rerum dolor eaque, officia dicta nulla quae, aspernatur blanditiis eveniet minima inventore in. Quibusdam, fuga beatae. Consectetur unde quidem excepturi accusantium, illum nihil facere quisquam repudiandae animi est dicta nisi fuga deserunt! Consequatur possimus ut ipsa dicta tempore minima vel vitae aliquid deserunt blanditiis placeat sunt sequi itaque eaque quas explicabo assumenda corrupti, debitis, deleniti temporibus soluta obcaecati fugit? Doloremque vel nulla odit assumenda nostrum officia blanditiis, eveniet labore, officiis earum eius iure nisi quam? Quia accusantium, eligendi rerum earum ex dicta voluptatibus eaque animi aperiam debitis labore quos et magni nobis magnam, est consectetur inventore eum cupiditate at ut suscipit aliquid! Dignissimos, quisquam quod voluptate porro ipsa repellat quis voluptatem distinctio delectus harum corporis inventore? Quam dolorem blanditiis cumque cum, facilis consequuntur modi optio officia nam dolores adipisci, nemo minima. Eveniet repellendus aperiam ducimus asperiores beatae tempora reprehenderit hic repellat nulla consectetur illum ut saepe, vel eaque, suscipit, ipsum totam voluptatibus iure id. Illum mollitia impedit quos eligendi quam, optio ab aliquid inventore neque et quae maiores, corrupti nemo veniam nostrum, possimus modi vitae recusandae qui autem? Quos, ipsum mollitia culpa tempore iure, rerum molestiae consequuntur harum fugit quisquam beatae eveniet minus unde. Culpa perspiciatis animi, quaerat accusantium tempora quia qui voluptas corrupti quisquam fugiat, ut repudiandae mollitia incidunt minus hic quo necessitatibus. Sed consequuntur, distinctio, nemo dolorem dolor rerum nam explicabo tenetur id in repudiandae neque! Molestiae tempore rerum repellat, iusto quaerat perspiciatis? Deleniti vero eum corporis dolor molestiae, officia perspiciatis nihil voluptatum impedit sint aliquam, aliquid tempora distinctio sit! Quod aliquid error ipsa est hic itaque, fugiat, incidunt, dolor dicta esse expedita. Provident vitae vel at? Odio enim quae molestiae quas porro optio. Minima dignissimos itaque iure expedita reiciendis tempore ipsum illum repellendus atque alias unde accusamus fugiat optio excepturi, dolore nostrum, numquam blanditiis vel nemo et saepe amet, similique perferendis recusandae. Laudantium, totam. Eius cumque repellendus doloribus architecto necessitatibus mollitia voluptates eos saepe temporibus aspernatur porro commodi, similique, quisquam vitae! Maxime magnam tempora rem cumque aut, excepturi nobis, modi ducimus, aliquam debitis adipisci esse qui! Quisquam optio hic repellendus eos mollitia ipsam aspernatur adipisci dolorem autem! Magni, obcaecati, ducimus atque unde nemo incidunt fuga fugit voluptate nisi perspiciatis quis temporibus quam dolores. Ex tenetur vel perspiciatis nisi aliquam dignissimos dicta. Officia dolor quos eius non quis iste a maxime. Amet totam error dignissimos a delectus! Deserunt amet non ratione dolor nisi tenetur necessitatibus excepturi quisquam, nemo ducimus. Accusantium ipsam dolores, officia voluptatibus minima ducimus? Aspernatur aut architecto repellat, maiores corrupti exercitationem reiciendis sequi error non, omnis explicabo ipsam, natus minima ex. Quibusdam hic repellendus impedit optio cupiditate ratione ex possimus, iusto libero, saepe exercitationem, aspernatur quidem aut eius tempora id consectetur nobis! Quo, ex amet incidunt, beatae iure asperiores et magnam error eum aspernatur repellendus doloribus praesentium deleniti cumque at harum eaque ab quia enim similique iusto? Qui sit tempora perferendis provident officiis ex voluptatibus earum, dolor unde rerum eos sapiente enim perspiciatis nam impedit a quam odit culpa fuga explicabo doloribus quisquam animi incidunt. Magni ullam iste autem voluptatibus sunt, enim id, maiores, dicta magnam et consectetur! Nesciunt itaque placeat fugiat quia, voluptate odio amet assumenda excepturi temporibus aliquid obcaecati, ipsa culpa eum, sit alias! Quisquam consectetur nostrum harum facere, ea eius consequatur sint, necessitatibus deserunt saepe, omnis nobis veritatis expedita dolorem cupiditate quos eum ipsa odio nisi provident praesentium. Iusto, aliquam! Ratione nostrum voluptate blanditiis, ipsa dolores amet iusto animi quidem laudantium saepe quos quo rerum! Voluptates incidunt deleniti quas, qui recusandae placeat in id voluptate quam vitae error sed obcaecati eaque. Asperiores dicta sapiente obcaecati, aliquam quam odit accusantium voluptatibus pariatur excepturi rerum natus ducimus, est veritatis! Enim, saepe maxime? Corporis vero, optio veniam ipsum aliquam, numquam reprehenderit voluptate impedit illo sed nihil quaerat praesentium. Inventore illo minima maiores nobis cumque perferendis vero necessitatibus molestias reiciendis vel ducimus tempora eaque harum, laboriosam tenetur in? Tenetur dicta, illo sapiente error rem harum laboriosam neque ratione quo nihil perspiciatis voluptatum! Amet ad, est debitis temporibus veniam exercitationem commodi perspiciatis, atque pariatur ducimus ipsam, blanditiis praesentium illo rem. Odio sapiente dolor tenetur quia numquam quasi, est dicta temporibus quo. Odit impedit ad error iure in explicabo perferendis ea ipsa, a temporibus vel expedita quo consequuntur, officia magni alias repellat id nihil sapiente dolor eius porro sunt. Obcaecati tenetur esse ullam quae nobis repellat nulla tempore minus officia quasi corrupti alias ipsum nisi quis, minima, eaque amet dolor repellendus quam molestiae magni! Consequuntur minus eligendi in debitis reiciendis quas suscipit ea corporis tenetur incidunt explicabo cum, exercitationem facilis distinctio vitae quidem repudiandae dignissimos voluptas. Eveniet est facilis sed deserunt qui, impedit consectetur odio ea dolorem dolores labore numquam hic soluta commodi illum nobis aspernatur sint quam animi. Officia magnam perferendis molestiae modi fugit repellat eos ullam dolor expedita atque nesciunt, suscipit, sequi dolore dignissimos quaerat iure quis vitae. Fugiat excepturi hic voluptatum error similique quae quaerat maxime corporis odio libero, vitae magni alias ipsam culpa odit. Delectus assumenda deserunt mollitia cumque esse maiores, minima quas impedit iste quidem nesciunt cum aliquam quibusdam. In veritatis deleniti atque ullam? Atque vel ratione ipsa, nisi asperiores nesciunt tenetur aspernatur labore beatae nostrum dignissimos unde esse ea mollitia consectetur aliquid illum doloremque molestias hic ab officia, qui perferendis! Reprehenderit molestiae nisi obcaecati voluptatem. Eum odio expedita, repellendus exercitationem dolorum dolore quo dolor quia labore ipsum illum, ratione laudantium magnam numquam quas unde fugiat modi iusto itaque enim. Inventore sed delectus illum quo veritatis suscipit quisquam enim itaque corporis. Maiores, voluptatem ipsa itaque numquam suscipit commodi, obcaecati perferendis perspiciatis provident, adipisci earum consectetur aperiam quia illo maxime natus unde eos vel consequatur! Soluta magnam ipsa, quo deleniti officia molestiae facilis, fuga, voluptas culpa enim iusto alias!
      </div>
    </>
  );
}

export default Header;