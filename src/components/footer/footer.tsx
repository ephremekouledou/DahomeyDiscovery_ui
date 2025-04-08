// import React from 'react'
// import { useRef, useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

import './footer.css';
import { WhatsAppOutlined } from '@ant-design/icons';
import { FacebookOutlined } from '@ant-design/icons';
import { InstagramOutlined } from '@ant-design/icons';
import { TwitterOutlined } from '@ant-design/icons';

// import { Button } from 'antd';


function Footer() {
    return (
        <>
            <div className='divFooter'>
                <footer>
                    <div>

                    </div>
                    <div className='waves'>
                        <div className='wave' id='wave1'></div>
                        <div className='wave' id='wave2'></div>
                        <div className='wave' id='wave3'></div>
                        <div className='wave' id='wave4'></div>
                    </div>
                    <ul className='social_icon'>
                        <li>
                            <a href='#'><FacebookOutlined /></a>
                        </li>
                        <li>
                            <a href='#'><WhatsAppOutlined/></a>
                        </li>
                        <li>
                            <a href='#'><TwitterOutlined /></a>
                        </li>
                        <li>
                            <a href='#'><InstagramOutlined /></a>
                        </li>
                    </ul>
                    <ul className='menu'>
                        <li>
                            <a href='#'>home</a>
                        </li>
                        <li>
                            <a href='#'>about</a>
                        </li>
                        <li>
                            <a href='#'>service</a>
                        </li>
                        <li>
                            <a href='#'>team</a>
                        </li>
                    </ul>
                    <p>MI-KWABO # All Rights Reserved</p>
                </footer>
            </div>
        </>
    );
}
export default Footer
