import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown,faChevronUp, faCircle} from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faO } from '@fortawesome/free-solid-svg-icons';
import { faCoffee, faHeart, faEnvelope, faCheck, faPlus, faMinus, faStar, faUser, faCog, faInfo, faShoppingCart, faFolder, faCalendar, faClock, faPaperPlane, faPhone, faMapMarker, faDesktop, faMobile, faLightbulb,faSquare } from '@fortawesome/free-solid-svg-icons';

export default function ChooseIcon() {
    return (
        <li className='nav-item'>
            <div class="btn-group">
                <button class="btn btn-secondary dropdown-toggle me-3" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                    Select Icon
                </button>
                <ul class="dropdown-menu w-auto">
                    <div class="btn-group dropend">
                    <a id='a' className="dropdown-item" href="/">
                        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                            faCircle
                        </button>
                        <ul class="dropdown-menu">
                        <li><a id='1' className="dropdown-item" href="/">faCircle-1<FontAwesomeIcon icon={faCircle} className='turquoise float-end'/></a></li>
                        <li><a id='2' className="dropdown-item" href="/">faCircle-2<FontAwesomeIcon icon={faCircle} className='yellow float-end'/></a></li>
                        </ul>
                    </a>  
                    </div>
                    <li><hr class="dropdown-divider"/></li>
                    <div class="btn-group dropend">
                    <a id='a' className="dropdown-item" href="/">
                        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                            faTimes
                        </button>
                        <ul class="dropdown-menu">
                        <li><a id='1' className="dropdown-item" href="/">faTimes-1<FontAwesomeIcon icon={faTimes} className='turquoise float-end'/></a></li>
                        <li><a id='2' className="dropdown-item" href="/">faTimes-2<FontAwesomeIcon icon={faTimes} className='yellow float-end'/></a></li>
                        </ul>
                    </a>
                    </div>
                    <li><hr class="dropdown-divider"/></li>
                    <div class="btn-group dropend">
                    <a id='a' className="dropdown-item" href="/">
                        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                            faTimes
                        </button>
                        <ul class="dropdown-menu">
                        <li><a id='1' className="dropdown-item" href="/">faO-1<FontAwesomeIcon icon={faO} className='turquoise float-end'/></a></li>
                        <li><a id='2' className="dropdown-item" href="/">faO-2<FontAwesomeIcon icon={faO} className='yellow float-end'/></a></li>
                        </ul>
                    </a>
                    </div>



                </ul>
            </div>
        </li>
        )
    }