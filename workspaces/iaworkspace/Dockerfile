FROM kasmweb/core-ubuntu-jammy-desktop:1.15.0
USER root

ENV HOME=/home/kasm-default-profile
ENV STARTUPDIR=/dockerstartup
WORKDIR $HOME

######### Installazione Sudo e Dipendenze #########
RUN apt-get update && apt-get install -y sudo wget gpg python3-pip \
    && echo "kasm_user ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/kasm_user

######### 1. Installazione Visual Studio Code #########
RUN wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg \
    && install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg \
    && sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list' \
    && apt-get update && apt-get install -y code

######### 2. Installazione Cursor (AppImage) #########
RUN mkdir -p /opt/cursor \
    && wget -O /opt/cursor/cursor.appimage https://downloader.cursor.sh/linux/appImage/x64 \
    && chmod +x /opt/cursor/cursor.appimage

######### 3. Installazione Antigravity (Python) #########
RUN pip3 install antigravity

######### Configurazione Desktop Icons #########
# Creazione della cartella Desktop nel profilo default
RUN mkdir -p $HOME/Desktop

# Scorciatoia per VS Code
RUN echo '[Desktop Entry]\n\
Version=1.0\n\
Type=Application\n\
Name=Visual Studio Code\n\
Comment=Code Editing\n\
Exec=/usr/bin/code --no-sandbox --unity-launch %F\n\
Icon=vscode\n\
Path=\n\
Terminal=false\n\
StartupNotify=true' > $HOME/Desktop/vscode.desktop

# Scorciatoia per Cursor
RUN echo '[Desktop Entry]\n\
Version=1.0\n\
Type=Application\n\
Name=Cursor AI\n\
Comment=AI Code Editor\n\
Exec=/opt/cursor/cursor.appimage --no-sandbox\n\
Icon=code\n\
Path=\n\
Terminal=false\n\
StartupNotify=true' > $HOME/Desktop/cursor.desktop

# Scorciatoia per Antigravity (apre il browser sul fumetto XKCD via Python)
RUN echo '[Desktop Entry]\n\
Version=1.0\n\
Type=Application\n\
Name=Antigravity\n\
Comment=Fly with Python\n\
Exec=python3 -m antigravity\n\
Icon=applications-games\n\
Path=\n\
Terminal=false\n\
StartupNotify=false' > $HOME/Desktop/antigravity.desktop

# Permessi corretti per le icone
RUN chmod +x $HOME/Desktop/*.desktop && \
    chown -R 1000:1000 $HOME/Desktop

######### Pulizia #########
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

USER 1000
