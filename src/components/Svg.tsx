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
      width="9"
      height="19"
      viewBox="0 0 9 19"
      fill="none"
      className="footstep-icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1.98446 13.0597C3.16792 13.4809 4.21287 13.7495 5.71404 14.229C5.12501 21.7637 -1.76508 18.7602 1.98457 13.0594L1.98446 13.0597ZM2.32582 11.6924C2.30566 10.6454 2.35937 9.63623 1.91792 8.64081C1.41644 7.57348 1.33631 6.6373 1.61372 5.08734C2.11832 2.26816 3.18502 0.510496 4.62557 0.12455C7.69825 -0.335366 8.07886 2.75845 8.15341 5.02146C8.32303 6.28797 7.27884 11.708 6.01616 12.6261C4.77531 12.3006 3.55697 11.9814 2.32582 11.6924Z" />
    </svg>
  );
}

function LeftShoeOutline() {
  return (
    <svg
      width="8"
      height="19"
      viewBox="0 0 8 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="footstep-icon"
    >
      <path d="M6.20018 12.9809C5.01672 13.4021 3.97177 13.6707 2.4706 14.1502C3.05918 21.6856 9.94972 18.6814 6.20018 12.9809ZM5.85884 11.6136C5.87902 10.5665 5.82529 9.55729 6.26674 8.56198C6.76822 7.49465 6.84835 6.55847 6.57094 5.00851C6.06634 2.18933 4.99964 0.431669 3.5591 0.0457234C0.486408 -0.414193 0.105802 2.67962 0.0312553 4.94263C-0.138367 6.20915 0.90582 11.6292 2.1685 12.5472C3.40946 12.2218 4.6278 11.9025 5.85884 11.6136Z" />
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
