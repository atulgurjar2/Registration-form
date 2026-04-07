const form = document.getElementById('registerForm');
const toast = document.getElementById('toast');
const pwd = document.getElementById('password');
const confirmPwd = document.getElementById('confirmPassword');
const pwdToggle = document.querySelector('.pwd-toggle');
const pwdStrength = document.getElementById('pwdStrength');

function setError(name, msg){
  const el = document.querySelector(.error[data-for="${name}"]);
  if(el) el.textContent = msg || '';
}
function showToast(msg){
  toast.textContent = msg;
  toast.style.display = 'block';
  setTimeout(()=>toast.style.display='none',3000);
}

function calcStrength(p){
  let s=0;
  if(p.length>=8) s++;
  if(/[A-Z]/.test(p)) s++;
  if(/[0-9]/.test(p)) s++;
  if(/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}

pwd.addEventListener('input',e=>{
  pwdStrength.value = calcStrength(e.target.value);
});

pwdToggle.addEventListener('click',()=>{
  [pwd,confirmPwd].forEach(i=>{
    i.type = i.type === 'password' ? 'text' : 'password';
  });
});

function isValidPhone(phone){
  if(!phone) return false;
  const digits = (phone.match(/\d/g)||[]).length;
  return digits>=7 && digits<=15;
}

function validateForm(data){
  let ok=true;
  if(!data.firstName){setError('firstName','Required');ok=false}else setError('firstName','');
  if(!data.lastName){setError('lastName','Required');ok=false}else setError('lastName','');

  // must provide at least email or phone
  if(!data.email && !data.phone){
    setError('email','Provide email or phone');
    setError('phone','Provide email or phone');
    ok=false;
  }else{
    if(data.email && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(data.email)){
      setError('email','Invalid email');ok=false;
    } else setError('email','');
    if(data.phone && !isValidPhone(data.phone)){
      setError('phone','Invalid phone');ok=false;
    } else setError('phone','');
  }

  if(data.website){
    try{ new URL(data.website); setError('website',''); }catch{setError('website','Invalid URL');ok=false}
  } else setError('website','');

  if(!data.password){setError('password','Required');ok=false}
  else if(data.password.length<8){setError('password','Too short');ok=false}
  else setError('password','');

  if(!data.confirmPassword){setError('confirmPassword','Required');ok=false}
  else if(data.password!==data.confirmPassword){setError('confirmPassword','Passwords do not match');ok=false}
  else setError('confirmPassword','');

  return ok;
}

form.addEventListener('submit',e=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  if(validateForm(data)){
    showToast('✅ Account created successfully (demo)');
    form.reset(); pwdStrength.value=0;
  }else{
    showToast('⚠ Please fix errors above');
  }
});
