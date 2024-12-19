{{/*
Return some recommended labels: https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/
*/}}
{{- define "common.labels" -}}
app.kubernetes.io/name: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion }}
app.kubernetes.io/managed-by: Helm
{{- end -}}

{{/*
Return the proper image name.
{{ include "common.image" ( dict "image" .Values.path.to.the.image ) }}
*/}}
{{- define "common.image" -}}
{{- $registryName := .image.registry -}}
{{- $repositoryName := .image.repository -}}
{{- $separator := ":" -}}
{{- $termination := .image.tag | toString -}}
{{- printf "%s/%s%s%s" $registryName $repositoryName $separator $termination -}}
{{- end -}}

{{/*
Return a resource request/limit preset.
*/}}
{{- define "common.resources.preset" -}}
limits:
  cpu: "375m"
  memory: "384Mi"
requests:
  cpu: "375m"
  memory: "384Mi"
{{- end -}}

{{/*
Return probes for the container.
*/}}
{{- define "common.probes" -}}
initialDelaySeconds: {{ .probe.initialDelaySeconds }}
periodSeconds: {{ .probe.periodSeconds }}
timeoutSeconds: {{ .probe.timeoutSeconds }}
failureThreshold: {{ .probe.failureThreshold }}
successThreshold: {{ .probe.successThreshold }}
{{- end -}}