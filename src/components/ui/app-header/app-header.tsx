import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import { Link, NavLink } from 'react-router-dom';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink type={'primary'} 
          to='/'
          className={({ isActive }) => isActive ? `${styles.link} ${styles.link_active}` : styles.link}
        >
          <BurgerIcon type={'primary'} />
          <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
        </NavLink>
        <NavLink
          to='/feed'
          className={({ isActive }) => isActive ? `${styles.link} ${styles.link_active}` : styles.link}
        >
          <ListIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </NavLink>
      </div>
      <div className={styles.logo}>
        <NavLink type={'primary'}
          to='/'
          className={({ isActive }) => isActive ? `${styles.link} ${styles.link_active}` : styles.link}
        >
          <Logo className='' />
        </NavLink>
      </div>
      <div className={styles.menu_part_right}>
        <NavLink type={'primary'}
          to='/profile' 
          className={({ isActive }) => isActive ? `${styles.link} ${styles.link_active}` : styles.link}
        >
          <div className={styles.link_position_last}>
            <ProfileIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </div>
        </NavLink>
      </div>
    </nav>
  </header>
);
