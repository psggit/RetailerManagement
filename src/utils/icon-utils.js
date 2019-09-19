import React from 'react'

export function getIcon (name) {
  switch (name) {
    case 'logo':
      return (
        <svg width="40px" height="40px" viewBox="0 0 62 64" version="1.1">
            <title>HBLogo</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g id="First-Launch" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Logo/Icon/Woodsmoke" transform="translate(-1.000000, 0.000000)">
                    <rect id="Rectangle-2" fillOpacity="0" fill="#4C6088" x="0" y="0" width="64" height="64"></rect>
                    <path d="M19.1939447,23.2897675 L26.8994081,23.2897675 L37.0533916,23.2897675 L42.1901799,31.8749062 L44.8237555,27.3449208 L44.8237555,5.03752517 L53.6148278,0 L62.4,5.03752517 L62.4,31.9824272 L62.4,58.9566172 L53.6148278,64 L44.8237555,58.9566172 L44.8237555,40.745378 L37.0179913,40.745378 L37.0214069,40.7395204 L26.8994081,40.7395204 L21.7224712,32.0828829 L19.1939447,36.4292556 L19.1939447,58.9624748 L10.4028724,64 L1.6118001,58.9624748 L1.6118001,32.0384137 L1.6,32.0175728 L1.6118001,31.9967178 L1.6118001,5.04338276 L10.4028724,0 L19.1939447,5.04338276 L19.1939447,23.2897675 Z" id="Combined-Shape" fill="#0C0D0F"></path>
                </g>
            </g>
        </svg>
    )
    case 'success':
        return (
            <svg width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 426.667 426.667">
            <path d="M213.333,0C95.518,0,0,95.514,0,213.333s95.518,213.333,213.333,213.333
                c117.828,0,213.333-95.514,213.333-213.333S331.157,0,213.333,0z M174.199,322.918l-93.935-93.931l31.309-31.309l62.626,62.622
                l140.894-140.898l31.309,31.309L174.199,322.918z"/>
            </svg>
        )
    case 'warning':
        return (
            <svg width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 286.054 286.054">
                <g>
                    <path d="M143.027,0C64.04,0,0,64.04,0,143.027c0,78.996,64.04,143.027,143.027,143.027
                    c78.996,0,143.027-64.022,143.027-143.027C286.054,64.04,222.022,0,143.027,0z M143.027,259.236
                    c-64.183,0-116.209-52.026-116.209-116.209S78.844,26.818,143.027,26.818s116.209,52.026,116.209,116.209
                    S207.21,259.236,143.027,259.236z M143.036,62.726c-10.244,0-17.995,5.346-17.995,13.981v79.201c0,8.644,7.75,13.972,17.995,13.972
                    c9.994,0,17.995-5.551,17.995-13.972V76.707C161.03,68.277,153.03,62.726,143.036,62.726z M143.036,187.723
                    c-9.842,0-17.852,8.01-17.852,17.86c0,9.833,8.01,17.843,17.852,17.843s17.843-8.01,17.843-17.843
                    C160.878,195.732,152.878,187.723,143.036,187.723z"/>
                </g>
            </svg>
        )
    case 'filter':
        return (
          <svg fill="#333" version="1.1" id="Capa_1" x="0px" y="0px"
               width="18px" height="18px" viewBox="0 0 971.986 971.986">
            <g>
                <path d="M370.216,459.3c10.2,11.1,15.8,25.6,15.8,40.6v442c0,26.601,32.1,40.101,51.1,21.4l123.3-141.3
                    c16.5-19.8,25.6-29.601,25.6-49.2V500c0-15,5.7-29.5,15.8-40.601L955.615,75.5c26.5-28.8,6.101-75.5-33.1-75.5h-873
                    c-39.2,0-59.7,46.6-33.1,75.5L370.216,459.3z"/>
            </g>
          </svg>
        )
    case 'cross-circle':
        return (
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                 viewBox="0 0 51.976 51.976">
                <g>
                    <path d="M44.373,7.603c-10.137-10.137-26.632-10.138-36.77,0c-10.138,10.138-10.137,26.632,0,36.77s26.632,10.138,36.77,0
                        C54.51,34.235,54.51,17.74,44.373,7.603z M36.241,36.241c-0.781,0.781-2.047,0.781-2.828,0l-7.425-7.425l-7.778,7.778
                        c-0.781,0.781-2.047,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828l7.778-7.778l-7.425-7.425c-0.781-0.781-0.781-2.048,0-2.828
                        c0.781-0.781,2.047-0.781,2.828,0l7.425,7.425l7.071-7.071c0.781-0.781,2.047-0.781,2.828,0c0.781,0.781,0.781,2.047,0,2.828
                        l-7.071,7.071l7.425,7.425C37.022,34.194,37.022,35.46,36.241,36.241z"/>
                </g>
            </svg>
        )
    case 'tick':
        return (
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	            width="15px" height="15px" viewBox="0 0 45.701 45.7"
	        >
                <g>
                    <g>
                        <path d="M20.687,38.332c-2.072,2.072-5.434,2.072-7.505,0L1.554,26.704c-2.072-2.071-2.072-5.433,0-7.504
                            c2.071-2.072,5.433-2.072,7.505,0l6.928,6.927c0.523,0.522,1.372,0.522,1.896,0L36.642,7.368c2.071-2.072,5.433-2.072,7.505,0
                            c0.995,0.995,1.554,2.345,1.554,3.752c0,1.407-0.559,2.757-1.554,3.752L20.687,38.332z"/>
                    </g>
                </g>
            </svg>

        )
    default:
  }
}
