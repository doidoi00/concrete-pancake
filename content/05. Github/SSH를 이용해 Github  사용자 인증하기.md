Github를 사용하면서 clone, push 등을 할 때 사용자 인증을 해야한다. 예전에는 계정 ID와 비밀번호만 있어도 인증이 되었지만, 최근에는 인증이 강화되어 Token이나 SSH를 통해 인증을 해야한다. 그 중에서 SSH를 이용한 인증이 하기 쉬워서 이를 통해 인증하려고 한다.

## SSH 키 생성하기

먼저 SSH 키를 생성하려면 터미널에 아래 텍스트를 붙여 넣으면 된다.

```
ssh-keygen -t ed25519 -C "your_email@example.com"
```

그럼 아래와 같은 "`key pair`"를 입력하라고 나온다.

```
Generating public/private ed25519 key pair.
Enter file in which to save the key (C:\Users\username/.ssh/id_ed25519):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

하나는 `key`를 저장할 파일 디렉토리를 지정하고, 다른 하나는 `passphrase` 을 입력하는거다. `passphrase`는 일종의 SSH 비밀번호라고 생각하면 된다. 생성 위치는 `C:\Users\username/.ssh/id_ed25519` 이고, `passphrase` 는 설정해도 되고, 생각 없으면 그냥 Enter 치면 된다. 그럼 아래 텍스트가 뜨게 되고, SSH-key 생성은 끝나게 된다.

```
Your identification has been saved in C:\Users\username/.ssh/id_ed25519
Your public key has been saved in C:\Users\username/.ssh/id_ed25519.pub
The key fingerprint is:
SHA256: your_ssh_public_key your_email@example.com
```
아래 나온 `key fingerprint` 를 복사해둔다.

---
## ssh-agent에 SSH 키 추가하기

키가 생성되면 그 다음 컴퓨터(ssh-agent)에 SSH 키를 저장해야 한다.
먼저 ssh-agent를 실행한다. 관리자 권한이 있는 Powershell에 ssh-agent 시작 옵션을 지정하기 위해 아래 텍스트를 친다.

```
Get-Service -Name ssh-agent | Set-Service -StartupType Manual    //ssh-agent 수동 시작
Get-Service -Name ssh-agent | Set-Service -StartupType Automatic    //ssh-agent 자동 시작
```

다음  `ssh-agent` 를 시작한다.

```
Start-Service ssh-agent
```

이제 관리자 권한이 없는 Powershell에서 `ssh-agent` 에 프라이빗 키를 추가한다. 다른 이름으로 키를 만들거나 이름이 다른 기존 키를 추가하는 경우 명령의 `id_ed25519` 를 프라이빗 키 파일의 이름으로 바꿔서 입력한다.

```
ssh-add c:/Users/username/.ssh/id_ed25519
```

---
## Github에 SSH 퍼블릭 키 추가하기

아까 터미널에 뜬 퍼블릭 키를 Github에 저장하면 된다. Settings > SSH and GPG Keys 에서 추가하면 된다. 
<img src ="settings1.png" align="center"/>
우측 상단 프로필 사진을 클릭해서 Settings에 들어간다. 
<img src ="settings.png" align="center"/>
이제 SSH-GPG key에 진입해서 우측 상단 `New SSH key` 를 누른다. 
<img src="register.png" align="center"/>
여기서 Title에 Key 이름을 입력하고, Key type 중에 용도에 따라 `Authentication Key` 와 `Signing Key` 를 선택한다. 

- `Authentication Key` : SSH 인증(git push, git pull, git commit -m "")을 위한 Key
- `Signing Key` : Commit(git commit -s "")의 서명(Signing)에 사용하는 Key

보통은 `Authentication Key` 를 등록하면 아무 문제없이 작동했다.

---
## SSH 연결 테스트

이제 SSH가 잘 설정되었는지 확인하기 위해 Powershell에 아래 텍스트를 입력한다.

```
ssg -T git@github.com
```

만약 잘 설정되었다면 다음과 같은 출력이 나올 것이다.

```shell
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

혹은 아래와 같은 출력이 나올 수도 있는데:

```shell
> The authenticity of host 'github.com (IP ADDRESS)' can't be established.
> ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
> Are you sure you want to continue connecting (yes/no)?
```

간단하게 yes를 눌러주면 연결이 완료된다.
