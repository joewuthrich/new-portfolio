import "../App.css";

function EmailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        opacity="0.15"
        d="M21 18V6.00001C21 5.72387 20.8881 5.47387 20.7071 5.29291L20.5 5.50001L13.4142 12.5858C12.6332 13.3668 11.3668 13.3668 10.5858 12.5858L3.5 5.50001L3.29289 5.29291C3.11193 5.47387 3 5.72387 3 6.00001V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18Z"
        className="email-fill-icon"
      />
      <path
        d="M3.29289 5.29289C3.47386 5.11193 3.72386 5 4 5H20C20.2761 5 20.5261 5.11193 20.7071 5.29289M3.29289 5.29289C3.11193 5.47386 3 5.72386 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.72386 20.8881 5.47386 20.7071 5.29289M3.29289 5.29289L10.5858 12.5858C11.3668 13.3668 12.6332 13.3668 13.4142 12.5858L20.7071 5.29289"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="email-stroke-icon"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      className="svg-icon"
    >
      <path d="M3.95833 1.95652C3.95833 3.05217 3.0875 3.91304 1.97917 3.91304C0.870833 3.91304 0 3.05217 0 1.95652C0 0.86087 0.870833 0 1.97917 0C3.0875 0 3.95833 0.86087 3.95833 1.95652ZM3.95833 5.47826H0V18H3.95833V5.47826ZM10.2917 5.47826H6.33333V18H10.2917V11.4261C10.2917 7.74783 15.0417 7.43478 15.0417 11.4261V18H19V10.0957C19 3.91304 11.9542 4.14783 10.2917 7.2V5.47826Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4 9L12 17L20 9"
        className="arrow-icon"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

function RightShoeOutline() {
  return (
    <svg
      width="16"
      height="38"
      viewBox="0 0 16 38"
      fill="none"
      className="footstep-icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.9689 26.1193C5.33583 26.9618 7.42572 27.4991 10.4281 28.458C9.24999 43.5274 -4.53017 37.5204 2.96912 26.1187L2.9689 26.1193ZM3.65162 23.3848C3.61131 21.2907 3.71873 19.2724 2.83582 17.2816C1.83287 15.1469 1.6726 13.2746 2.22743 10.1746C3.23662 4.53629 5.37003 1.02096 8.25112 0.24907C14.3965 -0.670763 15.1577 5.51687 15.3068 10.0429C15.646 12.5759 13.5577 23.416 11.0323 25.2521C8.5506 24.6012 6.11391 23.9627 3.65162 23.3848Z" />
    </svg>
  );
}

function LeftShoeOutline() {
  return (
    <svg
      width="15"
      height="38"
      viewBox="0 0 15 38"
      className="footstep-icon"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.4004 25.9617C10.0334 26.8042 7.94355 27.3414 4.9412 28.3003C6.11836 43.3713 19.8994 37.3628 12.4004 25.9617ZM11.7177 23.2271C11.758 21.1331 11.6506 19.1146 12.5335 17.124C13.5364 14.9893 13.6967 13.1169 13.1419 10.017C12.1327 4.37867 9.99928 0.863337 7.11819 0.0914467C0.972816 -0.828386 0.211603 5.35924 0.0625107 9.88527C-0.276734 12.4183 1.81164 23.2584 4.337 25.0945C6.81893 24.4436 9.25561 23.8051 11.7177 23.2271Z" />
    </svg>
  );
}

const Icons = {
  EmailIcon,
  LinkedInIcon,
  ArrowIcon,
  LeftShoeOutline,
  RightShoeOutline,
};

export default Icons;
