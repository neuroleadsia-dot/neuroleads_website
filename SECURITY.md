# Security Policy - NeuroLeads

## Mesures de sécurité implémentées

### 1. Headers de sécurité HTTP
- **X-Frame-Options: DENY** - Protection contre le clickjacking
- **X-Content-Type-Options: nosniff** - Empêche le MIME-type sniffing
- **X-XSS-Protection: 1; mode=block** - Protection XSS (navigateurs legacy)
- **Referrer-Policy: strict-origin-when-cross-origin** - Contrôle des referrers
- **Content-Security-Policy** - Limite les sources de contenu
- **Strict-Transport-Security (HSTS)** - Force HTTPS
- **Permissions-Policy** - Restreint les API du navigateur

### 2. Content Security Policy (CSP)
```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: https:;
connect-src 'self';
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
```

### 3. Dépendances
- Audit de sécurité npm régulier (`npm audit`)
- 0 vulnérabilités connues (corrigées avec `npm audit fix`)

### 4. Build sécurisé
- Tree-shaking activé
- Minification du code
- Source maps désactivées en production
- Hash dans les noms de fichiers (cache busting)

### 5. Formulaires
- Validation côté client
- Sanitization des entrées
- Protection contre XSS via React (escape automatique)

## Recommandations pour la production

### Hébergement
1. **HTTPS obligatoire** - Certificat SSL/TLS valide
2. **WAF** - Web Application Firewall (Cloudflare, AWS WAF)
3. **Rate Limiting** - Limiter les requêtes par IP
4. **DDoS Protection** - Protection contre les attaques

### Monitoring
- Surveillance des logs d'erreur
- Alertes de sécurité
- Scan de vulnérabilités réguliers

### Formulaire de contact
Actuellement, le formulaire est côté client uniquement. Pour une vraie production :
1. Backend avec validation serveur (Node.js/Express, Next.js API routes)
2. Rate limiting sur l'endpoint
3. CAPTCHA (hCaptcha ou reCAPTCHA v3)
4. Validation email (MX records check)
5. Stockage sécurisé (pas d'email en clair)

## Signalement de vulnérabilités

Si vous découvrez une vulnérabilité, merci de nous contacter :
- Email : neuroleads.ia@gmail.com
- Ne pas créer d'issue publique
