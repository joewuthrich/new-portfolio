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
        fill="black"
        fill-opacity="0.65"
      />
      <path
        d="M3.29289 5.29289C3.47386 5.11193 3.72386 5 4 5H20C20.2761 5 20.5261 5.11193 20.7071 5.29289M3.29289 5.29289C3.11193 5.47386 3 5.72386 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.72386 20.8881 5.47386 20.7071 5.29289M3.29289 5.29289L10.5858 12.5858C11.3668 13.3668 12.6332 13.3668 13.4142 12.5858L20.7071 5.29289"
        stroke="black"
        stroke-opacity="0.65"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
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
    >
      <path
        d="M3.95833 1.95652C3.95833 3.05217 3.0875 3.91304 1.97917 3.91304C0.870833 3.91304 0 3.05217 0 1.95652C0 0.86087 0.870833 0 1.97917 0C3.0875 0 3.95833 0.86087 3.95833 1.95652ZM3.95833 5.47826H0V18H3.95833V5.47826ZM10.2917 5.47826H6.33333V18H10.2917V11.4261C10.2917 7.74783 15.0417 7.43478 15.0417 11.4261V18H19V10.0957C19 3.91304 11.9542 4.14783 10.2917 7.2V5.47826Z"
        fill="black"
        fill-opacity="0.65"
      />
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
        stroke="black"
        stroke-opacity="0.9"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default { EmailIcon, LinkedInIcon, ArrowIcon };
