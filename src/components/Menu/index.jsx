import React from 'react';
import MenuItem from './MenuItem';

const Menu = () => {
    const menuItems = [
        { title: 'Quản lý danh mục câu hỏi', link: '#' },
        { title: 'Quản lý nhãn dán câu hỏi', link: '#' },
        { title: 'Quản lý tài khoản người dùng', link: '#' },
        { title: 'Quản lý câu hỏi', link: '#' },
    ];

    return (
        <nav>
            {menuItems.map((item, index) => (
                <MenuItem key={index} title={item.title} link={item.link} />
            ))}
        </nav>
    );
}

export default Menu;
