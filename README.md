<div align="center">

<h1>Stellarium + FastAPI<br/><sub>Stellarium basic commands in your browser.</sub></h1>

<pre lang="bash"><code style="white-space: pre-line">A basic implementation of Stellarium RemoteControl plugin interface with FastAPI.
</code></pre>

<img alt="Repository top language" src="https://img.shields.io/github/languages/top/daniloceesar/stellarium-fastapi.svg" />

<img alt="Repository size" src="https://img.shields.io/github/repo-size/daniloceesar/stellarium-fastapi.svg" />

<a href="https://github.com/DaniloCeesar/stellarium-fastapi/blob/main/LICENSE.md">
<img src="https://img.shields.io/badge/license-GNU%20GPLv2-brightgreen.svg"/>
</a>

</div>
<hr />

## 📚 Project overview

This project has made use of the [Stellarium Astronomy](https://stellarium.org) software, a free open source planetarium for your computer.

This repository provides a web interface, made using [FastAPI framework](https://github.com/tiangolo/fastapi), to interact with [Stellarium RemoteControl plugin HTTP API](https://stellarium.org/doc/head/remoteControlApi.html).

## 🛠️ Development & Testing

### Requirements

- **[Git](https://git-scm.com/)** — free and open source distributed version control system.
- **[Python](https://www.python.org/)** — easy to learn, powerful programming language.
- **[pip](https://pypi.org/project/pip/)** — package installer for Python packages.
- **[Stellarium Astronomy](https://stellarium.org/)** — free open source planetarium.
- **[Stellarium RemoteControl plugin HTTP API](https://stellarium.org/doc/head/remoteControlApi.html)** — HTTP-based interface to Stellarium, implemented on the server-side.

### Build instructions

1. You will need the **Stellarium** and **Stellarium RemoteControl plugin** up and running;
2. `git clone https://github.com/DaniloCeesar/stellarium-fastapi.git` — clone this repository into a new directory;
3. `cd stellarium-fastapi` — change the current directory to this project source code;
4. `cp .env.example .env` — generate a new environment file that will contain your project's environment variables;
5. `pip install -r requirements.txt` — install the dependencies from `requirements.txt` file into project's folder;
6. `uvicorn app:app --reload` — run the development server. The URL address and port will be displayed in your terminal.

## 👥 Attributions

This project is built by developing and using open source technology. We may use third party libraries, code sources, and assets both for production and development processes.

This project has made use of the Stellarium planetarium. Please remember to also cite [their paper](https://stellarium.org/files/stellarium.bib) in your acknowledgment.

## ⚖️ License

This project is licensed under the GNU General Public License v2.0. See the [LICENSE](https://github.com/DaniloCeesar/stellarium-fastapi/blob/main/LICENSE.md) for more information.
