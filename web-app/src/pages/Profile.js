import React from "react";

const Profile = () => {
  const person = {
    name: "Jane Doe",
    company: "Atlassian",
    role: "CEO",
    imageUrl: require("../img/jane.jpeg"),
    xUrl: "https://x.com",
    linkedinUrl: "https://linkedin.com",
    phone: 1234567890,
    whatsapp: "https://wa.me/1234567890",
    email: "hello@gmail.com",
  };

  function downloadVCard(person) {
    const fullName = person.name || "";
    const telephone = person.phone || "";
    const email = person.email;
    const companyName = person.company;
    const role = person.role;

    const vCardData = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${fullName}`, // `N:${lastName};${firstName}
      `FN:${fullName}`,
      `ORG:${companyName}`,
      `TITLE:${role}`,
      `TEL;TYPE=CELL:${telephone}`,
      `EMAIL:${email}`,
      "END:VCARD",
    ].join("\r\n");

    const blob = new Blob([vCardData], { type: "text/vcard" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `${person.name}.vcf`; // Name of the file to download
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }

  return (
    <div className="flex flex-col h-full items-center gap-8 m-4">
      <div className="rounded-2xl bg-black w-full px-8 py-10">
        <img
          className="mx-auto h-48 w-48 object-center object-cover rounded-3xl md:h-56 md:w-56"
          src={person.imageUrl}
          alt=""
        />
        <div className="flex flex-col justify-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {person.name}
          </h2>
          <p className="mt-2 text-center text-sm text-white">
            {person.role} @{person.company}
          </p>
        </div>

        <ul className="mt-6 flex justify-center items-center gap-x-6">
          <li>
            <a href={person.xUrl} className="text-white hover:text-gray-300">
              <span className="sr-only">X</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href={person.linkedinUrl}
              className="text-white hover:text-gray-300"
            >
              <span className="sr-only">LinkedIn</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              href={`mailto:${person.email}`}
              className="text-white hover:text-gray-300"
            >
              <span className="sr-only">Email</span>
              <svg
                className="h-5 w-5 hover:opacity-80"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g id="style=fill">
                    {" "}
                    <g id="email">
                      {" "}
                      <path
                        id="Subtract"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7 2.75C5.38503 2.75 3.92465 3.15363 2.86466 4.1379C1.79462 5.13152 1.25 6.60705 1.25 8.5V15.5C1.25 17.393 1.79462 18.8685 2.86466 19.8621C3.92465 20.8464 5.38503 21.25 7 21.25H17C18.615 21.25 20.0754 20.8464 21.1353 19.8621C22.2054 18.8685 22.75 17.393 22.75 15.5V8.5C22.75 6.60705 22.2054 5.13152 21.1353 4.1379C20.0754 3.15363 18.615 2.75 17 2.75H7ZM19.2285 8.3623C19.5562 8.10904 19.6166 7.63802 19.3633 7.31026C19.1101 6.98249 18.6391 6.9221 18.3113 7.17537L12.7642 11.4616C12.3141 11.8095 11.6858 11.8095 11.2356 11.4616L5.6886 7.17537C5.36083 6.9221 4.88982 6.98249 4.63655 7.31026C4.38328 7.63802 4.44367 8.10904 4.77144 8.3623L10.3185 12.6486C11.3089 13.4138 12.691 13.4138 13.6814 12.6486L19.2285 8.3623Z"
                        fill="#ffffff"
                      ></path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            </a>
          </li>
        </ul>
      </div>
      <div className="flex md:flex-row gap-4">
        <button className="rounded-2xl p-4 border-black border hover:border-blue-800 group">
          <div
            className="group-hover:text-blue-800"
            onClick={() => downloadVCard(person)}
          >
            Save contact
          </div>
        </button>
        <button className="rounded-2xl p-4 border-black border hover:border-blue-800 group">
          <a
            href={"https://penpalplayground.com"}
            className="group-hover:text-blue-800"
          >
            Share your contact
          </a>
        </button>
      </div>
    </div>
  );
};

export default Profile;
