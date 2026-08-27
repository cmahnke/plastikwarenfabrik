---
title: "K8s Volume Explorer"
date: 2026-08-25T15:33:09+02:00
---

Der Marketing Stunt "[Ox Alpha](https://oxalpha.com/)" hat mir ein neues Spielzeug generiert, um vernünftiger mit Dateien in einem Kubernetes-Cluster arbeiten zu können.

Das Tool ist auf [Github verfügbar](https://github.com/cmahnke/k8s-pv-gui). Es wird keine Garantie übernommen...

Das sagt Gemini dazu:

---

**K8s Volume Explorer** ist ein auf Electron basierender Datei-Manager für Kubernetes-Volumes. Er bietet eine grafische Oberfläche, um Verzeichnisstrukturen von mounted Volumes (`PVC`, `hostPath`, `emptyDir`) laufender Pods zu durchsuchen sowie Dateien per Drag & Drop zu übertragen.

### Funktionsweise

Das Tool setzt auf eine lokale `kubectl`-Installation auf und nutzt vorhandene Konfigurationen (`~/.kube/config` oder `$KUBECONFIG`).

* **Browsen:** Erfolgt via `kubectl exec ... ls -la` (mit Fallback für BusyBox-Images).
* **Upload / Download:** Nutzt `kubectl cp`. Falls im Ziel-Container kein `tar` vorhanden ist (z. B. bei Distroless-Images), greift ein Streaming-Fallback via Stdin/Cat für Einzeldateien.
* **Dateiverwaltung:** Erstellen, Umbenennen und Löschen von Ordnern oder Dateien geschehen direkt über Shell-Befehle im Container.

### Technische Fakten & Tools

* **Technologie-Stack:** Electron, TypeScript, esbuild.
* **Voraussetzungen:** Node.js ≥ 18, `kubectl` im PATH, entsprechende RBAC-Rechte im Cluster (`get pods`, `create pods/exec`).
* **Packaging:** Native Builds für macOS, Windows und Linux via [electron-builder](https://www.electron.build).
* **Qualitätssicherung:** CI-Pipelines nutzen [oxlint](https://oxc.rs) (inklusive vendored [anti-slop](https://github.com/dmmulroy/anti-slop)-Regeln), [Prettier](https://prettier.io) und [Stylelint](https://stylelint.io).

### Fakten vs. Marketing-Hype

* **Fakt (Bequemlichkeit):** Grafisches Drag & Drop und temporäres lokales Öffnen von Dateien aus dem Cluster ersparen das manuelle Tippen komplexer `kubectl cp`-Befehle.
* **Hype vs. Realität (Distroless-Einschränkungen):** Der Upload und Download kompletter Ordner scheitert bei Minimal-Images ohne `tar`, da der Stream-Fallback technisch bedingt nur für Einzeldateien funktioniert.
* **Hype vs. Realität (Drag & Drop Latenz):** Beim Herunterziehen von Dateien muss die Anwendung diese erst vollständig in ein lokales Temporärverzeichnis streamen, bevor das Betriebssystem die Datei übernimmt. Dies führt zu einer spürbaren Verzögerung beim Ziehen.

### Stabilität & Einschränkungen

* **Kein Papierkorb:** Löschvorgänge werden direkt via Shell im Container ausgeführt (`rm`). Gelöschte Daten sind unwiderruflich verloren.
* **Symlink-Grenzen:** Symlinks werden angezeigt, jedoch nur aufgelöst, wenn das Ziel im selben Verzeichnis liegt.
* **macOS Code-Signing:** Lokale macOS-Builds sind standardmäßig nicht signiert (`identity: null`) und erfordern für den Verteilbetrieb ein Developer-Zertifikat.
