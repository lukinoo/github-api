"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.getElementById("form");
const container_box = document.getElementById("container-box");
const search_input = document.getElementById("search");
// github users api
const API_URL = `https://api.github.com/users/`;
const getUserCardHandler = (login, avatar_url, public_repos, html_url, followers, following, name, location, updated_at, company) => {
    const userCard = document.createElement("div");
    let locationCheck = location === null ? "unknow" : location;
    let companyCheck = company === null ? "none" : company;
    userCard.innerHTML = `    
        <div class="top-side">
          <div class="top-side-info">
            <h2>
              ${login}
            </h2>
            <p>${name}</p>
            <p>location: ${locationCheck}</p>
            <p>company: ${companyCheck}</p>
          </div>
          <div class="top-side-image">
            <img
              src="${avatar_url}"
              title="${name}"
            />
          </div>
        </div>
        <div class="bottom-side-info">
          <div class="github-user-info">
            <p>Repositories: <b>${public_repos}</b></p>
            <p>Followers: <b>${followers}</b></p>
            <p>Following: <b>${following}</b></p>
            <p>Updated: <b>${updated_at}</b></p>
          </div>
          <div class="github-logo-side">
            <a href="${html_url}" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>
          </div>
        </div>
    `;
    container_box.appendChild(userCard);
};
const getUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield fetch(API_URL + username);
    const respData = yield resp.json();
    let { login, avatar_url, public_repos, html_url, followers, following, name, location, updated_at, company, } = respData;
    getUserCardHandler(login, avatar_url, public_repos, html_url, followers, following, name, location, updated_at, company);
});
getUser("lukinoo");
const formHandler = (e) => {
    e.preventDefault();
    let userName = search_input.value;
    if (userName) {
        container_box.innerHTML = "";
        getUser(userName);
        search_input.value = "";
    }
};
// form eventlistener
form.addEventListener("submit", formHandler);
