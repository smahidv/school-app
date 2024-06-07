import React, { createContext } from "react";

export const SvgsContext = createContext(null);

export default function SvgsProvider({ children }) {

    const svgs = {
    
        field: (
            <svg
                id="Layer_1"
                className="w-4 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
            >
                <path d="m12 13.04-8-2.286v-7.754a3 3 0 0 1 3.824-2.884l.925.184a3.032 3.032 0 0 1 2.251 2.9v7.47l1 .286 1-.286v-7.47a3.015 3.015 0 0 1 2.176-2.881l1.075-.219a2.933 2.933 0 0 1 2.556.508 2.976 2.976 0 0 1 1.193 2.392v7.753zm12 6.96v-14a3 3 0 0 0 -2-2.816v9.079l-10 2.857-10-2.857v-9.079a3 3 0 0 0 -2 2.816v14h11v2h-4v2h10v-2h-4v-2z" />
            </svg>
        ),
        student: (
            <svg
                className="w-4 fill-current"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="user_toga">
                    <path d="m21 9.714v-1.874l-4.27 1.07c-.23.06-.48.09-.73.09s-.5-.03-.74-.09l-4.26-1.07v1.874c-.645.972-1 2.095-1 3.286 0 3.309 2.691 6 6 6s6-2.691 6-6c0-1.191-.355-2.314-1-3.286zm-5 9.286c-4.411 0-8 3.589-8 8v3c0 .553.447 1 1 1h14c.553 0 1-.447 1-1v-3c0-4.411-3.589-8-8-8zm9-15v6c0 .553-.447 1-1 1s-1-.447-1-1v-4.72l-6.758 1.69c-.079.02-.161.03-.242.03s-.163-.01-.242-.03l-8-2c-.445-.112-.758-.511-.758-.97s.313-.858.758-.97l8-2c.158-.041.326-.041.484 0l8 2c.446.112.758.511.758.97z" />
                </g>
            </svg>
        ),
        teacher: (
            <svg
                id="Layer_1"
                className="w-4 fill-current"
                enableBackground="new 0 0 224.283 229.183"
                viewBox="0 0 224.283 229.183"
                width="512"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g>
                    <path d="m111.616 72.196c8.072 3.384 16.976 5.51 26.631 6.327 2.592.22 4.864 1.423 6.501 3.202l11.931-18.059 3.061 2.022-12.896 19.519c.45 1.286.65 2.681.529 4.124-.437 5.138-4.811 9.16-9.958 9.16-.279 0-.559-.016-.845-.038-9.45-.791-17.756-2.622-24.953-4.963v27.604h112.667v-119.333h-112.668zm92.412-38.05c2.266-3.673 8.314-3.351 10.26.484.966 1.901-.209 4.347-1.418 5.894-.492.627-1.024 1.178-1.592 1.661 1.209-.02 2.458-.297 3.479-.602.727-.216 2.424-.358 2.694.655.279 1.04-1.279 1.697-2.005 1.913-3.138.934-7.396 1.515-10.411-.093-1.898-1.012 1.342-2.487 2.149-2.597 1.226-.166 3.041-3.532 2.752-4.662-.191-.749-.664-1.488-1.336-1.907-.131-.08-.268-.174-.411-.257-1.273 1.169-5.295 1.348-4.161-.489zm-.997 7.156c.279.385-3.915 2.342-4.699 1.259-.435-.601-.896-1.235-1.539-1.632-.525-.32-.932-.302-.907-.408-.554.468-1.029 1.04-1.399 1.654-.999 1.657-1.841 3.758-1.426 5.729.364 1.733 1.245 3.488 2.526 4.732.666.646 1.41 1.3 2.287 1.649.167.078.341.14.517.191.352-.32.67-.673.936-1.066.588-.766 1.885-1.053 2.772-1.221.102-.02 2.327-.275 1.852.347-2.174 2.843-6.264 4.639-9.825 3.561-2.86-.866-5.629-4.319-5.82-7.327-.453-7.139 9.689-14.424 14.725-7.468zm-37.99-.51c2.932-2.58 5.712-1.718 7.688.387 1.653-2.297 4.219-3.663 7.319-2.354 5.334 2.255 5.635 10.894 4.108 15.486-.677 2.039-5.374 2.035-4.505-.582.925-2.785.736-6.356-.445-9.045-.656-1.498-1.955-3.844-2.984-1.377-.512 1.224-.739 2.384-.752 3.703-.021 1.931-4.325 2.877-4.734.798-.299-1.521-.72-3.343-1.857-4.477-1.111-1.106-.959 1.717-.939 2.435.073 2.757.703 5.491 1.466 8.132.639 2.21-4.058 3.48-4.699 1.259-1.138-3.929-3.327-11.144.334-14.365zm-19.999.251c.896-.516 2.313-.915 3.318-.476 2.691 1.175 5.917 1.399 8.803.946.516-.082 2.28-.11 1.995.883-.284.99-1.833 1.39-2.689 1.524-3.859.604-8.265.396-11.877-1.183-1.017-.442-.14-1.356.45-1.694zm1.796 5.606c3.589.711 7.154.983 10.8.599.915-.097 2.31.361 2.166 1.521-.148 1.188-1.564 1.776-2.594 1.886-4.023.426-8.043.167-12.007-.617-3.129-.621-.658-3.843 1.635-3.389zm-16.886-11.298c3.306-.699 6.873-.565 10.125.386 2.667.778-1.344 3.037-2.867 2.592-1.58-.462-6.319-1.825-6.653.526-.237 1.678-.176 3.353-.041 5.029.243-.031.485-.044.71-.033 2.876.141 5.748.166 8.625.166.86 0 1.899.662 1.336 1.611-.608 1.021-1.992 1.342-3.087 1.342-2.459 0-4.914-.035-7.369-.127.03 1.611-.151 3.311.115 4.829.637 3.63 5.364 2.207 8.042 2.086.777-.036 1.887.521 1.284 1.421-.656.977-2.019 1.243-3.1 1.292-2.855.131-10.02 1.624-10.802-2.822-.334-1.911-.023-3.851-.207-5.78-.184-1.92-.367-3.832-.393-5.764-.038-3.166.834-6.026 4.282-6.754z" />
                    <path d="m70.275 185.491c-2.34.211-4.792.333-7.366.333h-2.052l.009-.333.045-1.719 1.153-48.226.153-6.389.108-4.524-2.786 3.518-.797 1.007-.09.113-1.567 1.98-1.568-1.98-.09-.113-.659-.833-2.926-3.696.108 4.529.153 6.389 1.153 48.226.045 1.719.009.333h-2.052c-8.313 0-15.415-1.224-21.219-2.869v33.865c0 6.828 5.537 12.363 12.365 12.363 6.826 0 12.363-5.535 12.363-12.363v-31.329h4.772v31.329c0 6.828 5.537 12.363 12.365 12.363 6.826 0 12.363-5.535 12.363-12.363v-33.904c-3.398.971-7.25 1.794-11.53 2.314-.805.097-1.625.185-2.462.26z" />
                    <ellipse
                        cx="57.085"
                        cy="22.5"
                        rx="22.495"
                        ry="22.495"
                        transform="matrix(.974 -.227 .227 .974 -3.615 13.533)"
                    />
                    <path d="m9.027 137.597c.675 1.606 1.819 2.866 3.2 3.712.604.369 1.248.666 1.926.865.727.214 1.486.328 2.255.328 1.032 0 2.081-.201 3.092-.624 4.073-1.711 5.991-6.401 4.281-10.474-3.124-7.436-5.144-13.975-6.343-19.71-.483-2.311-.835-4.492-1.067-6.545-.252-2.234-.371-4.323-.37-6.265.002-1.62.089-3.13.234-4.562.487-4.812 1.712-8.62 3.291-11.742.293-.578.612-1.115.932-1.65.853-1.433 1.788-2.722 2.778-3.875-1.42 7.136-3.187 16.789-4.856 28.036.874 7.58 3.296 16.137 7.245 25.538 2.137 5.081-.265 10.955-5.349 13.092-1.241.518-2.54.782-3.866.782-.827 0-1.628-.125-2.406-.317-.679 9.345-1.093 18.99-1.093 28.637 0 0 6.017 4.775 17.129 8.034 4.923 1.443 10.852 2.582 17.698 2.882 1.15.051 2.319.084 3.521.084l-1.162-48.277-.154-6.389-.172-7.145-5.754-7.268-.529-.668.116-.841 2.1-16.262 2.921-22.609-.546-22.667-.001-.041-1.364.014-2.654.027h-6.292c-.64 0-1.258.086-1.852.232-.502.013-1.01.069-1.519.181v-.003c-.709.183-8.814 1.953-17.351 8.757-4.246 3.401-8.573 8.133-11.786 14.471-2.685 5.267-4.531 11.624-5.076 18.987-.109 1.486-.185 2.996-.184 4.563.006 10.811 2.665 23.545 9.027 38.712zm31.391 17.703-10.378-3.467-6.019-2.011.667-2.833 5.352 1.311 11.575 2.836z" />
                    <path d="m136.73 96.461c.23.02.459.029.686.029 4.112 0 7.606-3.152 7.961-7.325.048-.572.032-1.135-.037-1.682-.191-1.508-.807-2.896-1.731-4.033-1.323-1.629-3.276-2.741-5.532-2.932-10.534-.895-19.28-3.244-26.461-6.162-4.888-1.986-9.044-4.232-12.533-6.472-.753-.482-1.485-.965-2.176-1.443-4.29-2.981-7.381-5.841-9.352-7.89-.982-1.026-1.686-1.849-2.118-2.379-.217-.264-.364-.455-.446-.564-.04-.054-.065-.085-.071-.098l-.002.001c-1.414-1.983-3.568-3.124-5.82-3.32-.84-.313-1.745-.492-2.694-.492h-6.296l-2.654-.027-1.364-.014-.001.041-.164 6.834.001.006-.002.005-.352 14.636 2.969 23.813 2.025 16.245.117.841-.529.668-5.758 7.272-.172 7.14-.154 6.389-1.162 48.277c3.5 0 6.774-.23 9.83-.615 4.298-.541 8.155-1.394 11.53-2.391 11.024-3.257 16.988-7.994 16.988-7.994 0-34.973-5.421-69.943-9.306-90.515.735.451 1.492.9 2.27 1.347 1.953 1.12 4.058 2.218 6.287 3.277 3.383 1.609 7.08 3.122 11.108 4.459 7.3 2.423 15.654 4.275 25.115 5.068zm-52.461 55.327-10.514 3.512-1.017-3.536-.181-.628.181-.044 11.53-2.825 5.216-1.277.667 2.833z" />
                    <path d="m68.586 113.505-2.132-15.709-1.253-9.232-1.711-12.61-1.803-13.291 2.205-3.484.093-.148-.082-.326-1.774-7.006-.442-1.747h-4.601-4.601l-.442 1.747-1.777 7.019-.079.313.089.142 2.209 3.49-1.807 13.315-1.711 12.611-1.241 9.144-2.14 15.772 4.106 5.186 2.071 2.616 3.006 3.797 2.317 2.928 2.454-3.101 2.865-3.619 2.071-2.616z" />
                </g>
            </svg>
        ),
 
    
    };

    return (
        <SvgsContext.Provider
            value={
            
                svgs
            }
        >
            {children}
        </SvgsContext.Provider>
    );
}
